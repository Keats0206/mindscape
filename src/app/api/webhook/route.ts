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
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription, event.type);
        break;

      case 'invoice.paid':
      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(failedInvoice);
        break;

      case 'payment_method.attached':
      case 'payment_method.updated':
      case 'payment_method.detached':
        const paymentMethod = event.data.object as Stripe.PaymentMethod;
        await handlePaymentMethodChange(paymentMethod, event.type);
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

async function handleSubscriptionChange(subscription: Stripe.Subscription, eventType: string) {
  console.log(`Handling ${eventType} for subscription:`, subscription.id);

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const user_id = user?.id

  console.log('user_id', user_id)

  const subscriptionData = {
    user_id: user_id, // Assuming you store user_id in metadata
    status: eventType === 'customer.subscription.deleted' ? 'canceled' : subscription.status,
    plan_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    stripe_customer_id: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    stripe_subscription_id: subscription.id,
    stripe_price_id: subscription.items.data[0].price.id,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
    trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
    trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
  };

  // Upsert to subscriptions table
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id'
    });

  if (subscriptionError) throw subscriptionError;

  // Update user's subscription status
  const { error: userError } = await supabase
    .from('users')
    .update({ subscription_status: subscriptionData.status })
    .eq('id', subscriptionData.user_id);

  if (userError) throw userError;

  console.log(`Updated subscription and user status for user ${subscriptionData.user_id}`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('Handling paid invoice:', invoice.id);
  // Update subscription status to active if it's not already
  if (invoice.subscription) {
    const supabase = createClient()

    await supabase
      .from('subscriptions')
      .update({ status: 'active' })
      .eq('stripe_subscription_id', invoice.subscription)
      .eq('status', 'past_due');
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Handling failed invoice payment:', invoice.id);
  if (invoice.subscription) {
    const supabase = createClient()
    await supabase
      .from('subscriptions')
      .update({ status: 'past_due' })
      .eq('stripe_subscription_id', invoice.subscription);
  }
}

async function handlePaymentMethodChange(paymentMethod: Stripe.PaymentMethod, eventType: string) {
  console.log(`Handling ${eventType} for payment method:`, paymentMethod.id);
  // You might want to update payment method information in your database
  // or take other actions based on the event type
}