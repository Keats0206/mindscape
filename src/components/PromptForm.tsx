"use client";

import { useState, memo, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { Shuffle, Trash } from 'lucide-react';
import { GenApp } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const PromptForm = memo(({ onPromptChange, genApp }: {
  onPromptChange: (prompt: string) => void;
  genApp: GenApp;
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const measureRef = useRef<HTMLSpanElement>(null);

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

  const getInputWidth = (value: string, placeholder: string) => {
    // Use the longer of the current value or placeholder
    const textToMeasure = value || placeholder;
    if (measureRef.current) {
      measureRef.current.textContent = textToMeasure;
      // Add a small buffer (1.2) to prevent text from being too tight
      return `${Math.max(measureRef.current.offsetWidth * 1.2, 60)}px`;
    }
    return 'auto';
  };

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
      <Tabs defaultValue="prompt">
        <TabsList>
          <TabsTrigger value="prompt">Prompt Mode</TabsTrigger>
          <TabsTrigger value="open">Open Mode</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt">
        <span
        ref={measureRef}
        className="invisible absolute text-sm whitespace-pre"
        aria-hidden="true"
      />
      <div className="text-sm font-bold flex flex-wrap items-center gap-1 max-w-full">
        {genApp.promptForm.promptLines.map((line, index) => (
          <>
            <span className="whitespace-nowrap">
              {line.text}
            </span>
            <input 
              className={`${lineColors[index]} p-1 pr-0 rounded-md text-sm border-none focus:border-none focus:ring-0 max-w-full`}
              style={{
                width: getInputWidth(values[line.id] || '', line.placeholder),
                minWidth: '0px', // Minimum width for very short inputs
                maxWidth: "100%"
              }}
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
      </TabsContent>
      <TabsContent value="open">
        <div className="w-full max-w-full">
         <Textarea onChange={(e) => onPromptChange(e.target.value)} placeholder="Enter your prompt here..." className="w-full bg-white min-h-[14px]"/>
        </div>
      </TabsContent>
    </Tabs>
    </div>
  );
});

PromptForm.displayName = 'PromptForm';
export default PromptForm;