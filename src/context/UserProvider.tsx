// components/UserProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CompleteUserData } from '../types';
import { supabase } from '@/utils/supabase/client';

interface UserContextType {
  userData: CompleteUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<CompleteUserData | null>>;
  refreshUserData: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialData: CompleteUserData | null;
}

export function UserProvider({ children, initialData }: UserProviderProps) {
  const [userData, setUserData] = useState<CompleteUserData | null>(initialData);
  const [loading, setLoading] = useState(false);

  const refreshUserData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setUserData(null);
        return;
      }

      const { data, error } = await supabase
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

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await refreshUserData();
        } else if (event === 'SIGNED_OUT') {
          setUserData(null);
        }
      }
    );

    // Listen for subscription changes
    const subscriptionChannel = supabase
      .channel('subscription_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${userData?.id}`,
        },
        () => {
          refreshUserData();
        }
      )
      .subscribe();

    return () => {
      authSubscription.unsubscribe();
      subscriptionChannel.unsubscribe();
    };
  }, [userData?.id]); // Only re-run if user ID changes

  return (
    <UserContext.Provider value={{ userData, setUserData, refreshUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for user data
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Separate hook for subscription status
export function useSubscription() {
  const { userData, loading } = useUser();
  
  return {
    isProUser: userData?.subscription?.plan_id === 'price_1QAhDBAmqbespDjmWBg17XaU',
    isActive: ['active', 'trialing'].includes(userData?.subscription?.status || ''),
    isCanceling: userData?.subscription?.cancel_at_period_end,
    subscription: userData?.subscription,
    loading
  };
}