import React, { useState } from 'react';
import { GenApp } from '@/types';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface GenAppSelectorProps {
  genApps: GenApp[];
  activeGenApp: GenApp;
  onGenAppChange: (newGenApp: GenApp) => void;
}

export const GenAppSelector = ({ genApps, activeGenApp, onGenAppChange }: GenAppSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const closePopover = () => {
    setIsOpen(false);
  };

  const handleGenAppSelect = (genApp: GenApp) => {
    onGenAppChange(genApp);
    closePopover();
  };

  // Fallback image for error cases
  const fallbackImage = "/placeholder-image.webp";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className='w-full'>
        <div className='p-2 flex flex-row gap-2 border border-gray-200 rounded-md hover:border-gray-300 transition-colors'>
          <div className='w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center shadow-sm'>
            <Image 
              src={activeGenApp.coverImage} 
              alt={activeGenApp.name} 
              width={64}
              height={64}
              quality={85}
              className='w-full h-full object-cover transition-transform hover:scale-105 duration-300' 
              placeholder="blur" 
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
              priority
            />
          </div>
          <div className='flex flex-col items-start'>
            <div className='font-bold'>{activeGenApp.name}</div>
            <div className='text-xs text-gray-500 line-clamp-1 overflow-hidden'>{activeGenApp.description}</div> 
          </div>  
        </div>
        <div className='text-xs text-gray-500 w-full text-left pt-1'>Premium models coming soon, reach out to our team <a href="mailto:team@genspoai.com" className='text-blue-500'>team@genspoai.com</a></div>
      </SheetTrigger>
      <SheetContent side={'left'} className='p-4 flex flex-col h-full'>
        <div className='text-sm font-medium pb-2 text-stone-500'>Select A Model</div>
        <div className='flex-1 overflow-y-auto pr-2 -mr-2'>
          <div className='items-start grid grid-cols-2 gap-3'>
            {genApps.map((genApp, i) => (
              <button 
                key={i} 
                onClick={() => handleGenAppSelect(genApp)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md"
              >
                <div className='hover:bg-gray-50 flex flex-col gap-2 border border-gray-200 hover:border-gray-300 rounded-md p-2 transition-all duration-200 hover:shadow-sm'>
                  <div className='w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-md overflow-hidden relative group'>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image 
                      src={genApp.coverImage} 
                      alt={genApp.name} 
                      width={200}
                      height={200}
                      quality={85}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
                      placeholder="blur" 
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = fallbackImage;
                      }}
                    />
                    {genApp.loraWeights && (
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-full z-20">
                        LORA
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col justify-center items-start w-full'>
                    <div className='font-medium text-sm'>{genApp.name}</div>
                    <div className='text-left text-xs text-gray-500 line-clamp-2 h-8'>{genApp.description}</div> 
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='text-sm text-stone-500 pt-4 mt-auto'>Premium models coming soon, reach out to our team <a href="mailto:team@genspoai.com" className='text-blue-500'>team@genspoai.com</a></div>
      </SheetContent>
    </Sheet>
  );
};