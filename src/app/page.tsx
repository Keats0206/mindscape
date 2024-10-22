"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from "next/image";
import { ShuffleIcon } from '@radix-ui/react-icons';
import { imageOfOptions, dressedInOptions, wearingOptions, shotInOptions, framedAsOptions } from '@/data/promptData';
import { Switch } from '@/components/ui/switch';
import { models } from '@/data/modelData';
import { useUser } from "@/context/UserProvider"
import { supabase } from "@/utils/supabase/client"
import WordRotate from '@/components/ui/word-rotate';
import ImageCloud from '@/components/ui/image-cloud';

import Link from 'next/link';

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

export default function Create() {
  const activeModel = models[1];
  const [generatedItems, setGeneratedItems] = useState<{text: string, image: string}[]>([]);
  const { generateImage, storeGeneration, isLoading, error } = useImageOperations();
  const [prompt, setPrompt] = useState<string>("");
  const [isPublic,] = useState<boolean>(true);

  const [imageOf, setImageOf] = useState<string>("");
  const [dressedIn, setDressedIn] = useState<string>("");
  const [wearing, setWearing] = useState<string>("");
  const [shotIn, setShotIn] = useState<string>("");
  const [framedAs, setFramedAs] = useState<string>("");

  const userId = useUser().userData?.id;
  const isFree = useUser().userData?.subscription_status === "free_tier";
  // const [isGenerating, setIsGenerating] = useState(false);

  const renderNoUserState = () => (
    <div className='relative w-full h-full'>
      <div className='z-10 w-full h-full flex flex-col items-center justify-center'>
        <div className='text-5xl font-medium text-center'>Generate infinite</div>
        <WordRotate className="text-5xl font-medium text-center" 
          words={["outfit ideas", "interior design concept", "home decor inspo", "style inspiration"]} 
        />
        <div className='flex flex-row gap-4 pt-4'>
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

  const renderFreeUserState = () => (
    <div className='relative w-full h-full'>
      <div className='z-10 w-full h-full flex flex-col items-center justify-center gap-6'>
        <div className='text-4xl font-medium text-center'>Ready to start creating?</div>
        <WordRotate className="text-4xl font-medium" 
          words={["outfit ideas", "interior design concept", "home decor", "style inspiration"]} 
        />
        <div className='flex flex-row gap-4'>
          <Link href="/pricing">
            <Button>Upgrade to Generate</Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline">Browse Community Creations</Button>
          </Link>
        </div>
      </div>
      <div className='-z-10 flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full'>
        <ImageCloud images={images}/>
      </div>
    </div>
  );

  const renderPaidUserState = () => (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="p-4 overflow-y-scroll w-full h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {generatedItems.map(({ text, image }, index) => (
          <div key={index} className="text-center flex flex-col items-center w-full h-full">
            <Image
              src={image}
              alt={text}
              width={512}
              height={512}
              unoptimized
              className="rounded shadow-lg"
            />
            <p className="mt-2 text-sm text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );

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

  const handleShuffle = () => {
    const newImageOf = imageOfOptions[Math.floor(Math.random() * imageOfOptions.length)];
    const newDressedIn = dressedInOptions[Math.floor(Math.random() * dressedInOptions.length)];
    const newWearing = wearingOptions[Math.floor(Math.random() * wearingOptions.length)];
    const newShotIn = shotInOptions[Math.floor(Math.random() * shotInOptions.length)];
    const newFramedAs = framedAsOptions[Math.floor(Math.random() * framedAsOptions.length)];

    setImageOf(newImageOf);
    setDressedIn(newDressedIn);
    setWearing(newWearing);
    setShotIn(newShotIn);
    setFramedAs(newFramedAs);

    const currentPrompt = `${newImageOf} ${newDressedIn} ${newWearing} ${newShotIn} ${newFramedAs}`.trim();
    setPrompt(currentPrompt);
  }

  const handleGenerate = async () => {
    // setIsGenerating(true);
    const currentPrompt = `${imageOf} ${dressedIn} ${wearing} ${shotIn} ${framedAs}`.trim();
    setPrompt(currentPrompt);
    try {
      const imageData = await generateImage(currentPrompt);
      if (imageData) {
        const tags = [imageOf, dressedIn, wearing, shotIn, framedAs].filter(Boolean);
        // Update local state immediately
        setGeneratedItems(prev => [{
          text: currentPrompt,
          image: imageData as string
        }, ...prev]);
        // Store the generation
        const result = await storeGeneration(userId, currentPrompt, imageData as string, activeModel.name, isPublic, tags);
        if (result && result.data) {
          setGeneratedItems(prev => {
            const updatedItems = [...prev];
            updatedItems[0] = { text: currentPrompt, image: result.data.result_url };
            return updatedItems;
          });
        }
      }
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      // setIsGenerating(false);
    }
  };

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

  return (
    <div className="w-screen h-full flex flex-row pt-26">
      {userId && (
        <div className="w-[400px] flex flex-col gap-4 border-r p-4 pt-20">
          <div className='w-full'>
                <div className='bg-stone-100 p-2 flex flex-row items-center gap-2 border border-gray-200 border-gray-400 rounded-md'>
                <div className='w-12 h-12 bg-gray-200 rounded-md '>
                  <img src={activeModel.image} alt={activeModel.name} className='w-full h-full object-cover rounded-md' />
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-bold'>{activeModel.name}</div>
                  <div className='text-xs text-gray-500 line-clamp-1 overflow-hidden'>{activeModel.description}</div> 
                </div>
              </div>
              <div className='text-xs text-stone-500'>More models coming soon...have an idea? <a href="mailto:hello@genspoai.com" className='text-blue-500'>reach out</a></div>
            {/* <ModelSelector models={models} /> */}
          </div>
          <div className='flex flex-wrap w-full font-bold gap-1 items-center'>
            <div>An image of a</div>
            <input className='order rounded-md bg-red-100 p-1 w-auto' placeholder={"woman"} value={imageOf} onChange={(e) => setImageOf(e.target.value)} />
            <div>dressed in</div>
            <input className='rounded-md bg-blue-100 p-1 w-auto' placeholder={"a vintage leather jacket"} value={dressedIn} onChange={(e) => setDressedIn(e.target.value)} />
            <div>wearing</div>
            <input className='rounded-md bg-green-100 p-1 w-auto' placeholder={"a pink hat"} value={wearing} onChange={(e) => setWearing(e.target.value)} />
            <div>shot in a</div>
            <input className='rounded-md bg-yellow-100 p-1 w-auto' placeholder={"an open wild west town"} value={shotIn} onChange={(e) => setShotIn(e.target.value)} />
            <div>framed as a</div>
            <input className='rounded-md bg-orange-100 p-1 w-auto' placeholder={"full body portrait"} value={framedAs} onChange={(e) => setShotIn(e.target.value)} />
            <div className='flex flex-row gap-1 justify-end'>
              <Button variant="outline" onClick={handleShuffle}>
                <ShuffleIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {!isFree ? (
            <Button 
              className="w-full" 
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
          ) : (
            <Link href="/pricing">
              <Button className='w-full'>Upgrade to Generate</Button>
            </Link>
          )}
          <div className="flex items-center space-x-2">
            <Switch id="public-mode" defaultChecked={true} disabled={true} />
            <Label htmlFor="public-mode">Public</Label>
          </div>
          <span className="mt-0 text-xs text-gray-500">All creations while in beta are public</span>
        </div>
      )}
      {/* Right panel */}
      <div className="pt-16 w-full flex-1 overflow-y-auto">
        {!userId ? renderNoUserState() : (
          isFree ? renderFreeUserState() : renderPaidUserState()
        )}
      </div>
    </div>
  );
}