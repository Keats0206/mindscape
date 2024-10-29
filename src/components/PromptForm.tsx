"use client";

import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { Shuffle, Trash } from 'lucide-react';
import { GenApp } from '@/types';

const PromptForm = memo(({ onPromptChange, genApp }: {
  onPromptChange: (prompt: string) => void;
  genApp: GenApp;
}) => {
  // Dynamic state management for prompt lines
  const [values, setValues] = useState<Record<string, string>>({});

  const updatePrompt = (newValues: Record<string, string>) => {
    const prompt = genApp.promptForm.promptLines
      .map((line) => {
        const value = newValues[line.id];
        return `${line.text} ${value || ''}`;
      })
      .filter(Boolean)
      .join(' ')
      .trim();
    
    onPromptChange(prompt);
  };

  const handleShuffle = () => {
    track('Shuffle');
    const newValues = { ...values };
    
    genApp.promptForm.promptLines.forEach(line => {
      if (line.options && line.options.length > 0) {
        const randomOption = line.options[Math.floor(Math.random() * line.options.length)];
        newValues[line.id] = randomOption;
      }
    });

    setValues(newValues);
    updatePrompt(newValues);
  };

  const handleClear = () => {
    track('Clear');
    setValues({});
    updatePrompt({});
    onPromptChange('');
  };

  const randomColor = () => {
    const colors = ["bg-violet-100", "bg-teal-100", "bg-lime-100", "bg-orange-100", "bg-emerald-100", "bg-red-100"];
    let selectedColor;
  
    // Keep selecting a new color until we get one that hasn't been used before
    do {
      selectedColor = colors[Math.floor(Math.random() * colors.length)];
    } while (usedColors.includes(selectedColor));
  
    usedColors.push(selectedColor);
  
    // Reset the usedColors array once all colors have been used
    if (usedColors.length === colors.length) {
      usedColors = [];
    }
  
    return selectedColor;
  };
  
  let usedColors: string[] = [];
  
  return (
    <div className='md:text-lg bg-white border border-gray-200 rounded p-2 flex flex-wrap w-full font-bold gap-1 items-center'>
      {genApp.promptForm.promptLines.map((line) => (
        <div key={line.id} className='flex-wrap flex items-center gap-1'>
          {/* Text before input */}
          <div className="text-gray-700">{line.text}</div>
          {/* Input field */}
          <input 
            className={`rounded-md p-1 w-auto ${randomColor()}`}
            placeholder={line.placeholder}
            value={values[line.id] || ''}
            onChange={(e) => {
              const newValues = {
                ...values,
                [line.id]: e.target.value
              };
              setValues(newValues);
              updatePrompt(newValues);
            }}
          />
        </div>
      ))}
      <div className='flex flex-row gap-1 w-full mt-2'>
        <Button 
          variant="outline" 
          className='flex flex-row gap-1'
          onClick={handleShuffle}
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleClear}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

PromptForm.displayName = 'PromptForm';
export default PromptForm;