import { connectDB } from '@/lib/db';
import { Contact } from '@/models/Contact';
import { handleResponse, handleError } from '@/middleware/auth';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !phone || !subject || !message) {
      return handleError('Please provide all required fields', 400);
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return handleResponse(
      {
        message: 'Contact message sent successfully. We will get back to you soon!',
        contact,
      },
      201
    );
  } catch (error) {
    console.error('Contact error:', error);
    return handleError('Failed to send contact message', 500);
  }
}
