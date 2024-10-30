"use client";

import { useState, memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { Shuffle, Trash } from 'lucide-react';
import { GenApp } from '@/types';

const PromptForm = memo(({ onPromptChange, genApp }: {
  onPromptChange: (prompt: string) => void;
  genApp: GenApp;
}) => {
  const [values, setValues] = useState<Record<string, string>>({});

  // Generate colors once when component mounts
  const lineColors = useMemo(() => {
    const colors = [
      "bg-violet-100",
      "bg-teal-100",
      "bg-lime-100",
      "bg-orange-100",
      "bg-emerald-100",
      "bg-red-100"
    ];
    
    const usedColors: string[] = [];
    return genApp.promptForm.promptLines.map(() => {
      let selectedColor;
      do {
        selectedColor = colors[Math.floor(Math.random() * colors.length)];
      } while (usedColors.includes(selectedColor) && usedColors.length < colors.length);
      
      usedColors.push(selectedColor);
      if (usedColors.length === colors.length) {
        usedColors.length = 0;
      }
      return selectedColor;
    });
  }, []); // Empty dependency array means this runs once on mount

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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
      <div className="text-sm font-bold flex flex-wrap gap-2 items-center">
        {genApp.promptForm.promptLines.map((line, index) => (
          <>
              <span className="whitespace-nowrap">
                {line.text}
              </span>
              <input 
                className={`rounded-md p-1 text-sm ${lineColors[index]} min-w-fit flex-1`}
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
            </>
        ))}
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
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