import { NextResponse } from 'next/server';
import { sendEmail, sendClientConfirmation, ContactRequest } from '@/lib/contactNotifications';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data: ContactRequest = {
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      city: body.city || '',
      services: body.services || [],
      message: body.message || '',
      source: 'quote-widget',
      contactMethod: 'email',
    };

    // Basic validation
    if (!data.name?.trim()) {
      return NextResponse.json({ success: false, message: 'Name is required.' }, { status: 400 });
    }
    if (!data.email?.trim()) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }
    if (!data.phone?.trim()) {
      return NextResponse.json({ success: false, message: 'Phone is required.' }, { status: 400 });
    }
    if (!data.services?.length) {
      return NextResponse.json({ success: false, message: 'At least one service must be selected.' }, { status: 400 });
    }

    // Send business email — fail the request if this fails
    await sendEmail(data);

    // Client confirmation — non-critical
    await Promise.allSettled([sendClientConfirmation(data)]);

    return NextResponse.json(
      { success: true, message: "Thank you! We've received your quote request and will be in touch shortly." },
      { status: 200 }
    );

  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process quote request.' },
      { status: 500 }
    );
  }
}
