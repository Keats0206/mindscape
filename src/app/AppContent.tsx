"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from "next/image";
import { promptOptions } from '@/data/promptData';
import { Switch } from '@/components/ui/switch';
import { models } from '@/data/modelData';
import { useUser } from "@/context/UserProvider"
import { supabase } from "@/utils/supabase/client"
import { WordRotate } from '@/components/ui/word-rotate';
import { ImageCloud } from '@/components/ui/image-cloud';
import { Trash, Shuffle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useGenerationCount } from '@/hooks/useGenerationCount';
import { CompleteUserData } from '@/types';

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

export default function AppContent({ initialUserData }: { initialUserData: CompleteUserData | null }) {
  const { userData } = useUser();
  // Use the server-provided initial data if client context isn't ready yet
  const currentUserData = userData || initialUserData;  
  const activeModel = models[1];
  const [generatedItems, setGeneratedItems] = useState<{text: string, image: string}[]>([]);
  const { generateImage, storeGeneration, isLoading } = useImageOperations();
  const [prompt, setPrompt] = useState<string>("");
  const [isPublic,] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [imageOf, setImageOf] = useState<string>("");
  const [dressedIn, setDressedIn] = useState<string>("");
  const [wearing, setWearing] = useState<string>("");
  const [shotIn, setShotIn] = useState<string>("");
  const [framedAs, setFramedAs] = useState<string>("");

  const userId = useUser().userData?.id;
  const isProUser = useUser().userData?.subscription?.plan_id === 'price_1QAhDBAmqbespDjmWBg17XaU';
  const { getRemainingGenerations, incrementCount } = useGenerationCount(userId);

  useEffect(() => {
    const fetchGenerations = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

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

  const handleShuffle = () => {
    const newImageOf = promptOptions.imageOf[Math.floor(Math.random() * promptOptions.imageOf.length)];
    const newDressedIn = promptOptions.style[Math.floor(Math.random() * promptOptions.style.length)];
    const newWearing = promptOptions.accessories[Math.floor(Math.random() * promptOptions.accessories.length)];
    const newShotIn = promptOptions.location[Math.floor(Math.random() * promptOptions.location.length)];
    const newFramedAs = promptOptions.framing[Math.floor(Math.random() * promptOptions.framing.length)];

    setImageOf(newImageOf);
    setDressedIn(newDressedIn);
    setWearing(newWearing);
    setShotIn(newShotIn);
    setFramedAs(newFramedAs);

    const currentPrompt = `${newImageOf} ${newDressedIn} ${newWearing} ${newShotIn} ${newFramedAs}`.trim();
    setPrompt(currentPrompt);
  }

  const handleGenerate = async () => {
    setIsGenerating(true);
    const currentPrompt = `${imageOf} ${dressedIn} ${wearing} ${shotIn} ${framedAs}`.trim();
    setPrompt(currentPrompt);
    try {
      const imageData = await generateImage(currentPrompt);
      if (imageData) {
        const tags = [imageOf, dressedIn, wearing, shotIn, framedAs].filter(Boolean);
        // Update local state immediately
        setIsGenerating(false);
        setGeneratedItems(prev => [{
          text: currentPrompt,
          image: imageData as string
        }, ...prev]);
        incrementCount();
        // Store the generation
        const result = await storeGeneration(userId, currentPrompt, imageData as string, activeModel.name, isPublic, tags);
        if (result && result.data) {
          // setGeneratedItems(prev => {
          //   const updatedItems = [...prev];
          //   updatedItems[0] = { text: currentPrompt, image: result.data.result_url };
          //   return updatedItems;
          // });
        }
      }
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setImageOf("");
    setDressedIn("");
    setWearing("");
    setShotIn("");
    setFramedAs("");
  }

  const images = [
    {
      src: "generation_1.png",
      alt: "Generation 1",
      link: "https://genspo.com/generation1",
      width: 100,
      height: 100,
    },
    {
      src:  "generation_2.png",
      alt: "Generation 2",
      link: "https://genspo.com/generation2",
      width: 100,
      height: 100,
    },
    {
      src: "generation_3.png",
      alt: "Generation 3",
      link: "https://genspo.com/generation3",
      width: 100,
      height: 100,
    },
    {
      src: "generation_4.png",
      alt: "Generation 4",
      link: "https://genspo.com/generation4",
      width: 100,
      height: 100,
    },
    {
      src: "generation_5.png",
      alt: "Generation 5",
      link: "https://genspo.com/generation5",
      width: 100,
      height: 100,
    },
    {
      src: "generation_6.png",
      alt: "Generation 6",
      link: "https://genspo.com/generation6",
      width: 100,
      height: 100,
    },
    
  ]

  const renderNoUserState = () => (
    <div className='relative w-full h-full'>
      <div className='z-10 w-full h-full flex flex-col items-center justify-center'>
        <div className='text-5xl font-medium text-center'>Generate infinite</div>
        <WordRotate className="text-5xl font-medium text-center" 
          words={["outfit ideas", "interior design concept", "home decor inspo", "style inspiration"]} 
        />
        <div className='flex flex-row gap-4 pt-4 '>
          <Link href="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className='-z-10 flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full opacity-50'>
        <ImageCloud images={images}/>
      </div>
    </div>
  );

  const renderAuthedUserState = () => (
    <div className="w-screen h-full flex flex-col md:flex-row pt-26">
        <div className="border-t border-2 md:border-0 z-30 bg-white drop-shadow-2xl w-full absolute md:relative bottom-0 backdrop-blur-2xl md:w-[400px] flex flex-col gap-4 border-r p-4 md:pt-20">
          {/* Model Block */}
          <div className='w-full'>
              <div className='flex flex-row items-center gap-2 rounded-md'>
                <div className='md:w-8 md:h-8 w-6 h-6 bg-gray-200 rounded-md '>
                  <img src={activeModel.image} alt={activeModel.name} className='w-full h-full object-cover rounded-md' />
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-bold text-gray-800'>{activeModel.name}</div>
                  <div className='hidden md:block text-xs text-gray-500 line-clamp-1 overflow-hidden'>{activeModel.description}</div> 
                </div>
              </div>
            {/* <ModelSelector models={models} /> */}
          </div>
          <div className='md:text-lg bg-white border border-gray-20 rounded p-2 flex flex-wrap w-full font-bold gap-1 items-center rounded'>
            <div>An photo of a</div>
            <input className='order rounded-md bg-violet-100 p-1 w-auto' placeholder={"woman"} value={imageOf} onChange={(e) => setImageOf(e.target.value)} />
            <div>dressed in</div>
            <input className='rounded-md bg-orange-100 p-1 w-auto' placeholder={"a vintage leather jacket"} value={dressedIn} onChange={(e) => setDressedIn(e.target.value)} />
            <div>wearing</div>
            <input className='rounded-md bg-lime-100 p-1 w-auto' placeholder={"a pink hat"} value={wearing} onChange={(e) => setWearing(e.target.value)} />
            <div>shot in</div>
            <input className='rounded-md bg-teal-100 p-1 w-auto' placeholder={"an open wild west town"} value={shotIn} onChange={(e) => setShotIn(e.target.value)} />
            <div>framed as</div>
            <input className='rounded-md bg-pink-100 p-1 w-auto' placeholder={"full body portrait"} value={framedAs} onChange={(e) => setFramedAs(e.target.value)} />
            <div className='flex flex-row gap-1 justify-end'>
              <Button variant="outline" onClick={handleShuffle}>
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {isProUser ||  getRemainingGenerations() > 0 ? (
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
          >
            {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          ) : (
            <div className='flex flex-col gap-2'>
              <Link href="/pricing">
                <Button className='w-full'>Upgrade to Generate</Button>
              </Link>
              <div className='text-sm text-gray-500'>You are out of free credits. <Link href="/pricing" className='text-blue-500'>Upgrade</Link> to generate more.</div>
            </div>
          )}
          <div className='flex flex-row md:flex-col gap-2'>
            <div className="flex items-center space-x-2">
              <Switch id="public-mode" defaultChecked={true} disabled={true} />
              <Label htmlFor="public-mode">Public</Label>
            </div>
            <span className="mt-0 text-xs text-gray-500">All creations while in beta are public</span>
        </div>
        <div className='absolute bottom-4 hidden md:block text-xs text-stone-500'>More models coming soon...have an idea? <a href="mailto:hello@genspoai.com" className='text-blue-500'>reach out</a></div>

      </div>
      {/* Right panel */}
      <div className="relative pt-16 w-full flex-1 overflow-y-auto">
          {!isProUser && (
            <div className='p-2 sticky top-0'>
              <Alert className='bg-purple-100 border-purple-300 border'>
                {/* <Sparkles className="h-4 w-4" /> */}
                <AlertTitle className='font-bold'>More Credits</AlertTitle>
                <AlertDescription className='pb-2 text-sm font-medium'>
                    Free plans have a generation limit. Upgrade to generate more.
                  </AlertDescription>
              <Link href="/pricing">
                <Button size="sm" variant="outline">
                  <Sparkles className="h-4 w-4 mr-2" />
                    Get Plus
                </Button>
              </Link>
            </Alert>
            </div>
          )}
          <div className='w-full bg-white'>
            <div className="max-h-screen p-4 overflow-y-scroll w-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {isGenerating && (
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full aspect-square rounded-md" />
                  <Skeleton className="w-full h-2 rounded-md" />
                  <Skeleton className="w-full h-2 rounded-md" />
                </div>
              )}
              {generatedItems.map(({ text, image }, index) => (
                <div key={index} className="text-center flex flex-col items-center w-full">
                  <Image
                    src={image}
                    alt={text}
                    width={512}
                    height={512}
                    unoptimized
                    className="rounded-xl"
                  />
                  <p className="mt-2 text-sm text-gray-600">{text}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  if (!currentUserData) {
    return renderNoUserState();
  }

  return renderAuthedUserState();
}