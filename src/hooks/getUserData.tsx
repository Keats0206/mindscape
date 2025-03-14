import { createClient } from '@/utils/supabase/server';
import { CompleteUserData, Subscription, UserDetails, createCompleteUserData } from '@/types';

export async function getUserData(): Promise<CompleteUserData | null> {  
  const supabase = await createClient();

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    if (userError) {
      console.error('Error fetching user from auth:', userError);
      throw userError;
    }
    if (!user) {
      console.log('No user found in Supabase auth');
      return null;
    }
    const { data: userDetails, error: detailsError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (detailsError) {
      console.error('Error fetching user details:', detailsError);
      console.log('Attempting to fetch all users to check if the table is accessible');
      const { data: allUsers, error: allUsersError } = await supabase
        .from('users')
        .select('id')
        .limit(5);

      if (allUsersError) {
        console.error('Error fetching any users:', allUsersError);
      } else {
        console.log('Sample of user IDs in the table:', allUsers.map(u => u.id));
      }

      throw detailsError;
    }

    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subscriptionError);
      throw subscriptionError;
    }
    const completeUserData = createCompleteUserData(
      userDetails as UserDetails, 
      subscription as Subscription
    );
    return completeUserData;
  } catch (error) {
    console.error('Error in getUserData:', error);
    return null;
  }
}