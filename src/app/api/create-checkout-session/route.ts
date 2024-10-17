import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID of the product you want to sell
          price: 'price_1QAhDBAmqbespDjmWBg17XaU',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/canceled`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe API error:', err);
    const errorMessage = 
      err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}