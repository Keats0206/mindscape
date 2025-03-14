import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn('Resend API key is not set. Email functionality will be disabled.');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { message, userEmail } = await request.json();
    const timestamp = new Date().toLocaleString();

    if (!resend) {
      console.warn('Email not sent: Resend client is not initialized');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Feedback <feedback@genspoai.com>',
      to: 'pete@pekeating.com',
      subject: 'New Website Feedback',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Feedback Received</h2>
          <p>From: ${userEmail}</p>
          <p style="color: #666;">Received on: ${timestamp}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;">${message}</p>
          </div>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">This message was sent from your website's feedback form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}