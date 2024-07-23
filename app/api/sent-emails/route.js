import clientPromise from '../../lib/mongodb';

export async function GET(request) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection('sentEmails');
  
      const emails = await collection.find({}).toArray();
  
      return Response.json(emails);
    } catch (error) {
      console.error('Error fetching emails:', error);
      return Response.json({ message: 'Error fetching emails', error: error.message }, { status: 500 });
    }
}
