import { simpleParser } from 'mailparser';
import Imap from 'node-imap';
import { MongoClient } from 'mongodb';
import { flattenDeep } from 'lodash';

const clientPromise = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();

const getParts = (parts) => {
    return flattenDeep(parts.map(part => {
        if (part.parts) {
            return getParts(part.parts);
        }
        return part;
    }));
};

const checkForEmails = async ({ user, password, host, port }) => {
    const imapConfig = {
        user: user,
        password: password,
        host: host,
        port: port,
        tls: true,
        tlsOptions: { rejectUnauthorized: false, servername: host },
        authTimeout: 5000
    };

    const imap = new Imap(imapConfig);

    const openInbox = (cb) => {
        imap.openBox('INBOX', true, cb);
    };

    imap.once('ready', async () => {
        openInbox(async (err, box) => {
            if (err) throw err;

            // Search for unseen emails
            imap.search(['UNSEEN'], async (err, results) => {
                if (err) throw err;

                if (!results || results.length === 0) {
                    console.log('No new emails found');
                    imap.end();
                    return;
                }

                const fetch = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'], struct: true, markSeen: true });
                // Connect to MongoDB
                const client = await clientPromise;
                const db = client.db();
                const receivedCollection = db.collection('receivedEmails');
                const sentCollection = db.collection('sentEmails');

                // Fetch sent emails for reference matching
                const sentEmails = await sentCollection.find({}).toArray();

                fetch.on('message', (msg, seqno) => {
                    const emailDocument = { attachments: [] };

                    msg.on('body', async (stream, info) => {
                        if (info.which === 'TEXT') {
                            let body = '';
                            stream.on('data', (chunk) => {
                                body += chunk.toString('utf8');
                            });

                            stream.once('end', async () => {
                                const mail = await simpleParser(body);
                                emailDocument.body = mail.text || 'No body';
                                emailDocument.date = mail.date || new Date();


                                // Insert the email into the receivedEmails collection
                                try {
                                    await receivedCollection.insertOne(emailDocument);
                                } catch (insertError) {
                                    console.error('Error inserting email into receivedEmails collection:', insertError);
                                    // Handle the insertion error appropriately, e.g., retry or skip
                                }
                            });
                        } else if (info.which.includes('HEADER')) {
                            let header = '';
                            stream.on('data', (chunk) => {
                                header += chunk.toString('utf8');
                            });

                            stream.once('end', () => {
                                const headers = Imap.parseHeader(header);
                                emailDocument.from = headers.from ? headers.from[0] : 'Unknown sender';
                                emailDocument.subject = headers.subject ? headers.subject[0] : 'No subject';
                                const matches = emailDocument.from.match(/^(.+) <(.+)>$/);
                                emailDocument.name = matches ? matches[1] : emailDocument.from;
                                emailDocument.email = matches ? matches[2] : '';
                            });
                        }
                    });

                    msg.once('attributes', (attrs) => {
                        const parts = getParts(attrs.struct);
                        emailDocument.attachments = parts.filter(part => part.disposition && part.disposition.type === 'attachment').map(part => ({
                            filename: part.params.name,
                            encoding: part.encoding,
                            partID: part.partID
                        }));
                    });

                    msg.once('end', () => {
                        // console.log('Finished message', seqno);
                    });
                });

                fetch.once('error', (err) => {
                    console.error('Fetch error:', err);
                });

                fetch.once('end', () => {
                    console.log('Done fetching all messages!');
                    imap.end();
                });
            });
        });
    });

    imap.once('error', (err) => {
        console.error('IMAP error:', err);
    });

    // imap.once('end', () => {
    //     console.log('Connection ended');
    // });

    imap.connect();
};

export default checkForEmails;
