// utils/user.ts
import { createClient } from "@/utils/supabase/server";
import { cache } from 'react';
import { CompleteUserData, createCompleteUserData, Subscription, UserDetails } from '@/types';

export const getCurrentUser = cache(async (): Promise<CompleteUserData | null> => {
  const supabase = await createClient();
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return null;
    }

    // First get user details
    const { data: userDetails, error: userError } = await supabase
      .from('users')
      .select(`
        id,
        username,
        email,
        full_name,
        bio,
        profile_picture_url,
        created_at,
        updated_at,
        stripe_customer_id,
        subscription_status,
        active_subscription_id
      `)
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user details:', userError);
      return null;
    }

    // Then get subscription data
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        user_id,
        status,
        plan_id,
        current_period_start,
        current_period_end,
        created_at,
        updated_at,
        stripe_customer_id,
        stripe_subscription_id,
        stripe_price_id,
        cancel_at_period_end,
        canceled_at,
        trial_start,
        trial_end
      `)
      .eq('user_id', user.id)
      .single();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') { // Ignore not found error
      console.error('Error fetching subscription:', subscriptionError);
      return null;
    }

    // Combine the data to match CompleteUserData interface
    return createCompleteUserData(
      userDetails as UserDetails,
      subscription as Subscription
    );

  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
});