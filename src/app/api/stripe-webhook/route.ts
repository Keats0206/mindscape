import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  console.log('Event received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription, event.type);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed, but received' }, { status: 200 });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Handling completed checkout session:', session.id);

  const supabase = createClient();

  const userId = session.metadata?.userId;
  if (!userId) {
    console.error('User ID not found in session metadata');
    return;
  }

  console.log('User ID from session metadata:', userId);

  // Fetch the subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  const subscriptionData = {
    user_id: userId,
    status: subscription.status,
    plan_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: subscription.id,
    stripe_price_id: subscription.items.data[0].price.id,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
    trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
    trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
  };

  // Insert into subscriptions table
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .insert(subscriptionData);

  if (subscriptionError) {
    console.error('Error inserting subscription data:', subscriptionError);
    return;
  }

// Update user's subscription status and active subscription ID
  const { error: userError } = await supabase
    .from('users')
    .update({ 
      subscription_status: subscriptionData.status,
      active_subscription_id: subscription.id
    })
    .eq('id', userId);

  if (userError) {
    console.error('Error updating user subscription status:', userError);
    return;
  }

  console.log(`Created subscription and updated user status for user ${userId}`);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription, eventType: string) {
  console.log(`Handling ${eventType} for subscription:`, subscription.id);

  const supabase = createClient();

  // Fetch the subscription from the database to get the user_id
  const { data: subscriptionData, error: fetchError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (fetchError) {
    console.error('Error fetching subscription data:', fetchError);
    return;
  }

  if (!subscriptionData) {
    console.error('Subscription not found in database');
    return;
  }

  const userId = subscriptionData.user_id;
  console.log('User ID from database:', userId);

  const updatedSubscriptionData = {
    status: eventType === 'customer.subscription.deleted' ? 'canceled' : subscription.status,
    plan_id: subscription.items.data[0].plan.id,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    stripe_price_id: subscription.items.data[0].price.id,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
    trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
    trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
  };

  // Update subscriptions table
  const { error: updateError } = await supabase
    .from('subscriptions')
    .update(updatedSubscriptionData)
    .eq('stripe_subscription_id', subscription.id);

  if (updateError) {
    console.error('Error updating subscription data:', updateError);
    return;
  }

  // Update user's subscription status
  const { error: userError } = await supabase
    .from('users')
    .update({ subscription_status: updatedSubscriptionData.status, active_subscription_id: subscription.id })
    .eq('id', userId);

  if (userError) {
    console.error('Error updating user subscription status:', userError);
    return;
  }

  console.log(`Updated subscription and user status for user ${userId}`);
}