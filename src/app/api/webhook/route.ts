import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { supabase } from '@/utils/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  console.log('Webhook received');

  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  console.log('Request body:', body);
  console.log('Stripe-Signature:', signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('Event constructed successfully:', event.type);
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Processing subscription event:', event.type);
        console.log('Subscription data:', JSON.stringify(subscription, null, 2));
        await updateSubscription(subscription);
        break;
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Processing subscription deletion event');
        console.log('Deleted subscription data:', JSON.stringify(deletedSubscription, null, 2));
        await updateSubscription(deletedSubscription, 'canceled');
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    console.log('Webhook processed successfully');
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function updateSubscription(subscription: Stripe.Subscription, overrideStatus?: string) {
  console.log('Updating subscription in database');
  console.log('Subscription ID:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  console.log('Status:', overrideStatus || subscription.status);

  const subscriptionData = {
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    status: overrideStatus || subscription.status,
    plan_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000),
    current_period_end: new Date(subscription.current_period_end * 1000),
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
    trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
    updated_at: new Date(),
  };

  console.log('Subscription data to be upserted:', JSON.stringify(subscriptionData, null, 2));

  const { error } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id'
    });

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  } else {
    console.log('Subscription updated successfully');
  }
}