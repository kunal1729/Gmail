
import checkForEmails from '../../lib/recieveEmails';

export async function POST(request) {
    console.log(request)
    const body = await request.json();
    const { user, password, host, port } = body;

    if (!user || !password || !host || !port) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        await checkForEmails({ user, password, host, port });
        return Response.json({ message: 'Checked for emails and processed accordingly.' });
    } catch (error) {
        console.error('Error checking emails:', error);
        return Response.json({ message: 'Error checking emails', error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ message: 'Method Not Allowed'}, { status: 500 });
}

