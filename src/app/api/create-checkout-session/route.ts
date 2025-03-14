import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || 'https://genspoai.com';
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get the user's Stripe customer ID from your database
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { stripe_customer_id } = userData;

    if (!stripe_customer_id) {
      return NextResponse.json({ error: 'Stripe customer ID not found for user' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripe_customer_id,
      line_items: [
        {
          price: 'price_1QDCwQAmqbespDjmXpqTT92U',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/profile`,
      metadata: {
        userId: userId
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe API error:', err);
    const errorMessage = 
      err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}