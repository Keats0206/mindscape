// hooks/useGenerationHistory.ts
import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";

export const useGenerationHistory = (userId: string | undefined) => {
  const [generatedItems, setGeneratedItems] = useState<{text: string, image: string}[]>([]);

  useEffect(() => {
    const fetchGenerations = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching generations:', error);
      } else if (data) {
        setGeneratedItems(data.map(gen => ({
          text: gen.prompt,
          image: gen.result_url
        })));
      }
    };

    fetchGenerations();
  }, [userId]);

  const addGeneration = (generation: {text: string, image: string}) => {
    setGeneratedItems(prev => [generation, ...prev]);
  };

  return { generatedItems, addGeneration };
};