"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
// import ModelSelector from '@/components/ModelSelector';
import Image from "next/image";
import { ShuffleIcon } from '@radix-ui/react-icons';
import { imageOfOptions, dressedInOptions, wearingOptions, shotInOptions, framedAsOptions } from './promptData';
import { Switch } from '@/components/ui/switch';
import { models } from './modelData';

function useImageGeneration() {
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
      return URL.createObjectURL(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generateImage, isLoading, error };
}

export default function Create() {
  const activeModel = models[1];

  const [generatedItems, setGeneratedItems] = useState<{text: string, image: string}[]>([]);
  const { generateImage, isLoading, error } = useImageGeneration();
  const [prompt, setPrompt] = useState<string>("");

  const [imageOf, setImageOf] = useState<string>("");
  const [dressedIn, setDressedIn] = useState<string>("");
  const [wearing, setWearing] = useState<string>("");
  const [shotIn, setShotIn] = useState<string>("");
  const [framedAs, setFramedAs] = useState<string>("");

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
    const currentPrompt = `${imageOf} ${dressedIn} ${wearing} ${shotIn} ${framedAs}`.trim();
    setPrompt(currentPrompt); // Update the prompt state for consistency
    const newImage = await generateImage(currentPrompt);
    if (newImage) {
      setGeneratedItems(prev => [{ text: currentPrompt, image: newImage }, ...prev]);
    }
  };

  return (
    <div className="w-screen flex flex-row">
      <div className="w-[400px] flex flex-col gap-4 border-r p-4 min-h-screen">
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
            <div className='text-xs text-stone-500'>More models coming soon...have an idea? <a href="mailto:hello@genspo.ai" className='text-blue-500'>reach out</a></div>
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
        <Button 
          className="w-full" 
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>
        <div className="flex items-center space-x-2">
          <Switch id="public-mode" defaultChecked={true} disabled={true} />
          <Label htmlFor="public-mode">Public</Label>
        </div>
        <span className="mt-0 text-xs text-gray-500">All creations while in beta are public</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
         {isLoading && (
            <div className="flex flex-col items-center w-full h-full">
              <Skeleton className="w-full rounded shadow-lg aspect-square" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          )}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}