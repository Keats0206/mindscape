import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { message, userEmail } = await request.json();
    const timestamp = new Date().toLocaleString();

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
      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}