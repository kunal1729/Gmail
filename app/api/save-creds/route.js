import User from '@/app/models/user.model';
import { MongoClient } from 'mongodb';

// Initialize MongoClient
const clientPromise = MongoClient.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // Optional: Adjust as needed
});

export async function POST(request) {
  console.log(request)
  const body = await request.json();
  const { smtpUser, smtpPass, host, smtpPort, ImapPort } = body;
  console.log("Received request with body:", body);

  try {
    const client = await clientPromise;
    const db = client.db();

    // Check if the email details are already stored
    const existingDetails = await db.collection('users').findOne({
      smtpUser,
      smtpPass,
      host,
      smtpPort,
      ImapPort
    });

    if (existingDetails) {
      return Response.json({ message: 'Email details already stored, Success' });
    }

    await db.collection('users').insertOne({
      smtpUser,
      smtpPass,
      host,
      smtpPort,
      ImapPort
    });

    return Response.json({ message: 'Email details stored successfully' });
  } catch (error) {
    console.error('Error storing email details:', error); // Log the error
    return Response.json({ message: 'Error storing email details', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}
