'use client';

import { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
// import Image from 'next/image';

const GeneratedImages = memo(({ 
    items, 
    isGenerating 
  }: { 
    items: Array<{text: string, image: string}>;
    isGenerating: boolean;
  }) => {
    return (
      <div className='w-full bg-white'>
        <div className="max-h-screen p-4 overflow-y-scroll w-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isGenerating && (
            <div className="flex flex-col space-y-2">
              <Skeleton className="w-full aspect-square rounded-md" />
              <Skeleton className="w-full h-2 rounded-md" />
              <Skeleton className="w-full h-2 rounded-md" />
            </div>
          )}
          {items.map(({ text, image }, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <div className="text-center flex flex-col items-center w-full">
                  <img
                    src={image}
                    alt={text}
                    width={512}
                    height={512}
                    className="rounded-xl"
                  />
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{text}</p>
                </div>
              </DialogTrigger>
              <DialogContent className='h-screen max-w-screen'> 
                <div className='pt-12 flex w-full h-full flex flex-col items-center justify-center'>
                  <img
                    src={image}
                    alt={text}
                    width={720}
                    height={720}
                    className="rounded-xl"
                  />
                  <p className="mt-2 text-sm text-gray-600 text-center">{text}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {items.length === 0 && !isGenerating && (
          <div className='max-w-[500px] p-24 text-center text-gray-500 w-full h-full flex items-center justify-center'>
            No generations yet. Start creating on the left using your own ideas or try the shuffle button!
          </div>
        )}
      </div>
    );
  });
  GeneratedImages.displayName = 'GeneratedImages';
  export default GeneratedImages;