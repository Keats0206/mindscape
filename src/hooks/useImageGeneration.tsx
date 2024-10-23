// hooks/useImageGeneration.ts
import { useState, useCallback } from 'react';

export const useImageGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/generate?text=${encodeURIComponent(text)}`);
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storeGeneration = useCallback(async (
    userId: string | undefined,
    prompt: string,
    imageData: string,
    modelUsed: string,
    isPublic: boolean,
    tags: string[]
  ) => {
    try {
      const response = await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId, prompt, imageData, modelUsed, isPublic, tags,
        }),
      });
      if (!response.ok) throw new Error('Failed to store generation');
      return await response.json();
    } catch (err) {
      console.error('Error storing generation:', err);
    }
  }, []);

  return { generateImage, storeGeneration, isLoading, error };
};