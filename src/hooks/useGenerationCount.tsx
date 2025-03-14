import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/utils/supabase/client";

export const useGenerationCount = (userId: string | undefined) => {
  const [totalGenerations, setTotalGenerations] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FREE_GENERATION_LIMIT = 25;

  useEffect(() => {
    const fetchGenerationCount = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        console.log('Fetching generation count for user:', userId);
        const { count, error } = await supabase
          .from('generations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        if (error) throw error;
        setTotalGenerations(count ?? 0);
        console.log('Current generation count:', count);
      } catch (err) {
        console.error('Error fetching generation count:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch generation count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenerationCount();
  }, [userId]);

  const hasGenerationsLeft = useCallback(() => {
    return totalGenerations < FREE_GENERATION_LIMIT;
  }, [totalGenerations]);

  const getRemainingGenerations = useCallback(() => {
    return Math.max(0, FREE_GENERATION_LIMIT - totalGenerations);
  }, [totalGenerations]);

  const incrementCount = useCallback(() => {
    setTotalGenerations(prev => prev + 1);
  }, []);

  return {
    totalGenerations,
    isLoading,
    error,
    hasGenerationsLeft,
    getRemainingGenerations,
    incrementCount
  };
};