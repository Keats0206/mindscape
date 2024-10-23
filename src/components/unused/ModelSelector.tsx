import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Model } from '@/types';

export const ModelSelector = ({ models }: { models: Model[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModel, setActiveModel] = useState(models[0]);
  
  const closePopover = () => {
    setIsOpen(false);
  };

  const handleModelSelect = (model: Model) => {
    setActiveModel(model);
    closePopover();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='w-full'>
        <div className='p-2 flex flex-row gap-2 border border-gray-200 hover:border-gray-400 rounded-md'>
          <div className='w-12 h-12 bg-gray-200 rounded-md '>
            <img src={activeModel.image} alt={activeModel.name} className='w-full h-full object-cover rounded-md' />
          </div>
          <div className='flex flex-col items-start'>
            <div className='font-bold'>{activeModel.name}</div>
            <div className='text-xs text-gray-500 line-clamp-1 overflow-hidden'>{activeModel.description}</div> 
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className='ml-[308px] -mt-16 w-[600px]'>
        <div className='text-sm font-medium pb-2 text-stone-500'>Select A Model</div>
        <div className='grid grid-cols-2 gap-2'>
          {models.map((model, i) => (
            <button key={i} onClick={() => handleModelSelect(model)}>
              <div className='hover:bg-gray-100 flex flex-row gap-2 border border-gray-200 rounded-md p-2'>
                <div className='w-12 h-12 bg-gray-200 rounded-md'>
                  <img src={model.image} alt={model.name} className='w-full h-full object-cover rounded-md' />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='font-bold'>{model.name}</div>
                    <div className='text-xs text-gray-500 line-clamp-1 overflow-hidden'>{model.description}</div> 
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className='text-sm text-stone-500 pt-4'>Have an idea for a model, reach out to our team <a href="mailto:hello@ge.ai" className='text-blue-500'>hello@bangers.ai</a></div>
      </PopoverContent>
    </Popover>
  );
};