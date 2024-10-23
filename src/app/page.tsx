import { createClient } from '@/utils/supabase/server';
import AppContent from './AppContent';

export default async function HomePage() {
    const { data: { user } } = await createClient().auth.getUser();
    // If we have a user, also fetch their full data
    let userData = null;
    if (user) {
      const { data } = await createClient()
        .from('users')
        .select(`
          *,
          subscription:subscriptions(
            id,
            status,
            plan_id,
            cancel_at_period_end,
            current_period_end,
            stripe_subscription_id
          )
        `)
        .eq('id', user.id)
        .single();
      
      userData = data;
    }
  
    return (
      <AppContent initialUserData={userData} />
    );
  }