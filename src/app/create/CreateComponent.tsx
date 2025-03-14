"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PromptForm from '@/components/PromptForm';
import GeneratedImages from '@/components/GeneratedImages';
import { genApps } from '@/data/modelData';
import { supabase } from "@/utils/supabase/client"
import Link from 'next/link';
import { useGenerationCount } from '@/hooks/useGenerationCount';
import { track } from '@vercel/analytics';
import { CompleteUserData, GenApp } from '@/types';
import { Sparkles } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { GenAppSelector } from '@/components/GenAppSelector';

const useImageOperations = () => {
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
        // Convert blob to base64
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
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            prompt,
            imageData,
            modelUsed,
            isPublic,
            tags,
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

export default function HomeClient({ initialUserData }: { initialUserData: CompleteUserData }) {
  const [isFetchingGenerations, setIsFetchingGenerations] = useState<boolean>(true);
  const { userDetails, subscription } = initialUserData;
  const [activeGenApp, setActiveGenApp] = useState(genApps[0]);

  const isProUser = subscription.status === "active";
  
  const [generatedItems, setGeneratedItems] = useState<{text: string, image: string}[]>([]);
  const [isPublic] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { generateImage, storeGeneration, isLoading } = useImageOperations();

  // Get generation count hook values
  const { 
    getRemainingGenerations,
    incrementCount,
  } = useGenerationCount(userDetails.id);

  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  // Fetch initial generations
  useEffect(() => {
    setIsFetchingGenerations(true);
    const fetchGenerations = async () => {
      if (!userDetails.id) return;
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userDetails.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching generations:', error);
      } else if (data) {
        setGeneratedItems(data.map(gen => ({
          text: gen.prompt,
          image: gen.result_url
        })));
        setIsFetchingGenerations(false);
      }
    };
    fetchGenerations();
  }, [userDetails.id]);

  // Handle generation
  const handleGenerate = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;
    track('Generate');
    setIsGenerating(true);
    try {
      const imageData = await generateImage(prompt);
      if (imageData) {
        const tags = prompt.split(' ').filter(Boolean);    
        setIsGenerating(false);
        setGeneratedItems(prev => [{
          text: prompt,
          image: imageData as string
        }, ...prev]);
        incrementCount();
        track('Generate Success');
        await storeGeneration(
          userDetails.id, 
          prompt, 
          imageData as string, 
          activeGenApp.model.name, 
          isPublic, 
          tags
        );
      }
    } catch (err) {
      track('Generate Error');
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [generateImage, storeGeneration, userDetails.id, activeGenApp.model.name, isPublic, incrementCount]);

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row pt-26">
      <div className="fixed bottom-0 border-t border-2 md:border-0 z-30 bg-white drop-shadow-2xl w-full md:relative backdrop-blur-2xl md:w-[400px] flex flex-col gap-4 border-r p-4 md:pt-20">

        <GenAppSelector 
          genApps={genApps}
          activeGenApp={activeGenApp}
          onGenAppChange={(newGenApp: GenApp) => {
            setActiveGenApp(newGenApp);
            // Reset prompt when changing apps
            setCurrentPrompt('');
          }}
        />

        <PromptForm 
          onPromptChange={setCurrentPrompt} 
          genApp={activeGenApp}
          key={activeGenApp.id} // Force re-render when genApp changes
        />

        {isProUser || getRemainingGenerations() > 0 ? (
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => handleGenerate(currentPrompt)}
            disabled={isLoading || isGenerating || !currentPrompt.trim()}
          >
            {isLoading || isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        ) : (
          <div className='flex flex-col gap-2'>
            <Link href="/pricing">
              <Button className='w-full'>Upgrade</Button>
            </Link>
            <div className='text-sm text-gray-500'>
              You are out of free credits. <Link href="/pricing" className='text-blue-500'>Upgrade</Link> to generate more.
            </div>
          </div>
        )}

        <div className='flex flex-row gap-2 items-center'>
          <div className="flex items-center space-x-2">
            <Switch id="public-mode" defaultChecked={true} disabled={true} />
            <Label htmlFor="public-mode">Public</Label>
          </div>
          <span className="mt-0 text-xs text-gray-500">All creations while in beta are public</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative pt-16 w-full flex-1 overflow-y-auto mb-[480px] md:mb-0">
        {isFetchingGenerations ? (
          <div className='p-24 text-center text-gray-500 w-full h-full flex items-center justify-center'>
            <LoadingSpinner />
          </div>
            ) : ( 
              < >
                {!isProUser &&  (
                  <div className='p-2 sticky top-0 hidden '>
                    <Alert className='bg-purple-100 border-purple-300 border'>
                  <AlertTitle className='font-bold'>More Credits</AlertTitle>
                  <AlertDescription className='pb-2 text-sm font-medium'>
                    Free plans have a generation limit. Upgrade to generate more.
                  </AlertDescription>
                  <div className='flex flex-row gap-2 items-center'>
                    <Link href="/pricing">
                      <Button variant="outline">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Upgrade
                      </Button>
                    </Link>
                    <div className='text-xs flex flex-row gap-2'>
                      {getRemainingGenerations()} credits remaining
                    </div>
                  </div>
                </Alert>
              </div>
            )}
            <GeneratedImages 
              items={generatedItems} 
              isGenerating={isGenerating} 
            />
        </>
        )}
      </div>
    </div>
  );
}