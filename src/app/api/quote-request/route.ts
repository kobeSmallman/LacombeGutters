import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// This endpoint is deprecated - redirect to unified contact API
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Transform the request to match the new contact API format
    const contactRequest = {
      ...body,
      source: 'quote-widget',
      contactMethod: 'email', // Default for backward compatibility
    };

    // Forward to the unified contact API
    const contactResponse = await fetch(new URL('/api/contact', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward relevant headers
        ...(request.headers.get('x-forwarded-for') && {
          'x-forwarded-for': request.headers.get('x-forwarded-for')!,
        }),
        ...(request.headers.get('x-real-ip') && {
          'x-real-ip': request.headers.get('x-real-ip')!,
        }),
      },
      body: JSON.stringify(contactRequest),
    });

    const result = await contactResponse.json();
    return NextResponse.json(result, { status: contactResponse.status });

  } catch (error) {
    console.error('Quote request forwarding error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process quote request.' },
      { status: 500 }
    );
  }
}
