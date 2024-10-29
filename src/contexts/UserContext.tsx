// contexts/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { CompleteUserData } from '@/types';
import { useRouter } from 'next/navigation';

interface UserContextType {
  userData: CompleteUserData | null;
  refresh: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children,
  initialUserData 
}: { 
  children: React.ReactNode;
  initialUserData: CompleteUserData | null;
}) {
  const router = useRouter();
  const [userData, setUserData] = useState<CompleteUserData | null>(initialUserData);
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_OUT') {
          setUserData(null);
          router.refresh(); // Force server components to refresh
          router.push('/login');
        } else if (event === 'SIGNED_IN') {
          await refresh();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Subscribe to real-time changes for the user's subscription
  useEffect(() => {
    if (!userData?.userDetails.id) return;

    const subscription = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${userData.userDetails.id}`,
        },
        async () => {
          await refresh();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userData?.userDetails.id]);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userData, refresh, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};