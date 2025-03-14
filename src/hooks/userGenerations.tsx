import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Generation {
  id: string;
  status: string;
  base_human_url?: string;
  with_lower_url?: string;
  with_upper_url?: string;
  final_url?: string;
  error?: string;
  created_at: string;
  updated_at?: string;
}

export function useGenerations() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    async function setupSubscription() {
      try {
        // Initial fetch of generations
        const { data: initialData, error: initialError } = await supabase
          .from('generations')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (initialError) throw initialError;
        setGenerations(initialData || []);

        // Set up realtime subscription
        channel = supabase
          .channel('generations_channel')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'generations'
            },
            (payload) => {
              console.log('Realtime update:', payload);
              setGenerations(current => {
                switch (payload.eventType) {
                  case 'INSERT':
                    return [payload.new as Generation, ...current];
                  case 'UPDATE':
                    return current.map(gen => 
                      gen.id === payload.new.id ? { ...gen, ...payload.new } : gen
                    );
                  case 'DELETE':
                    return current.filter(gen => gen.id !== payload.old.id);
                  default:
                    return current;
                }
              });
            }
          )
          .subscribe();

      } catch (err) {
        console.error('Error setting up realtime:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return { generations, loading, error };
} 