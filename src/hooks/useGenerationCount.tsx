import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";

const FREE_GENERATION_LIMIT = 5;

export const useGenerationCount = (userId: string | undefined) => {
  const [totalGenerations, setTotalGenerations] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenerationCount = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const { count, error } = await supabase
          .from('generations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        if (error) throw error;
        
        setTotalGenerations(count ?? 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch generation count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenerationCount();
  }, [userId]);

  const hasGenerationsLeft = () => {
    return totalGenerations < FREE_GENERATION_LIMIT;
  };

  const getRemainingGenerations = () => {
    return FREE_GENERATION_LIMIT - totalGenerations;
  };

  const incrementCount = () => {
    setTotalGenerations(prev => prev + 1);
  };

  return {
    totalGenerations,
    isLoading,
    error,
    hasGenerationsLeft,
    getRemainingGenerations,
    incrementCount
  };
};