
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

const clientPromise = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).connect();

export async function POST(req) {

  const { recipient, subject, body, senderName, smtpUser, smtpPass, host, smtpPort } = await req.json();
  console.log(smtpPass)
  const referenceCode = `REF-${Date.now()}`;
  const subjectWithRef = `${subject} [${referenceCode}]`;

  // Create SMTP transporter with environment variables
  let transporter = nodemailer.createTransport({
    host: host,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Email options
  let mailOptions = {
    from: `"${senderName}" <${smtpUser}>`,
    to: recipient,
    subject: subjectWithRef,
    text: body,
    html: `<p>${body}</p>`
  };

  try {
    // Attempt to send the email
    let info = await transporter.sendMail(mailOptions);

    // Call to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('sentEmails');

    await collection.insertOne({
      smtpUser: smtpUser,
      senderName : senderName,
      recipient : recipient,
      subject: subjectWithRef,
      body : body,
      referenceCode : referenceCode,
      status: 'sent',
      messageId: info.messageId
    });

    return Response.json({ message: 'Email sent', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
}
