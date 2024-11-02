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


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className='w-full'>
        <div className='p-2 flex flex-row gap-2 border border-gray-200 rounded-md'>
          <div className='w-12 h-12 bg-gray-200 rounded-md'>
            <Image 
              src={activeGenApp.coverImage} 
              alt={activeGenApp.model.name} 
              width={48}
              height={48}
              className='w-full h-full object-cover rounded-md aspect-square' 
              placeholder="blur" 
              blurDataURL={activeGenApp.coverImage} 
            />
          </div>
          <div className='flex flex-col items-start'>
            <div className='font-bold'>{activeGenApp.name}</div>
            <div className='text-xs text-gray-500 line-clamp-1 overflow-hidden'>{activeGenApp.description}</div> 
          </div>  
        </div>
        <div className='text-xs text-gray-500 w-full text-left pt-1'>More apps coming soon, including interior design, home decor, and more! Have an idea? <a href="mailto:team@genspoai.com" className='text-blue-500'>team@genspoai.com</a></div>
      </SheetTrigger>
      <SheetContent side={'left'} className='p-4 space-y-4'>
        <div className='text-sm font-medium pb-2 text-stone-500'>Select A Model</div>
        <div className='items-start grid grid-cols-2 gap-2'>
          {genApps.map((genApp, i) => (
            <button key={i} onClick={() => handleGenAppSelect(genApp)}>
              <div className='hover:bg-gray-100 flex flex-col gap-2 border border-gray-200 rounded-md p-2'>
                <div className='w-full aspect-square bg-gray-200 rounded-md'>
                  <Image 
                    src={genApp.coverImage} 
                    alt={genApp.name} 
                    width={100}
                    height={100}
                    className='w-full h-full object-cover rounded-md aspect-square overflow-hidden' 
                    placeholder="blur" 
                    blurDataURL={genApp.coverImage} 
                  />
                </div>
                <div className='flex flex-col justify-center items-start w-full'>
                    <div className='font-bold'>{genApp.name}</div>
                    <div className='text-left align-left text-xs text-gray-500 overflow-hidden'>{genApp.description}</div> 
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className='text-sm text-stone-500 pt-4'>Have an idea for a model, reach out to our team <a href="mailto:team@genspoai.com" className='text-blue-500'>team@genspoai.com</a></div>
      </SheetContent>
    </Sheet>
  );
};