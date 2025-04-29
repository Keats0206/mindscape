"use client";

import { useState, memo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { Shuffle } from 'lucide-react';
import { GenApp } from '@/types';
import { Textarea } from '@/components/ui/textarea';

const PromptForm = memo(({ onPromptChange, genApp }: {
  onPromptChange: (prompt: string) => void;
  genApp: GenApp;
}) => {
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const measureRef = useRef<HTMLSpanElement>(null);

  const handleShuffle = () => {
    track('Shuffle');
    
    // Combine options from all prompt lines to generate a good prompt
    let generatedPrompt = '';
    
    genApp.promptForm.promptLines.forEach(line => {
      generatedPrompt += line.text + ' ';
      
      if (line.options && line.options.length > 0) {
        // Get random option for this line
        const randomOption = line.options[Math.floor(Math.random() * line.options.length)];
        generatedPrompt += randomOption + ' ';
      }
    });
    
    // Trim and update
    generatedPrompt = generatedPrompt.trim();
    setCurrentPrompt(generatedPrompt);
    onPromptChange(generatedPrompt);
  };

  const handleClear = () => {
    track('Clear');
    setCurrentPrompt('');
    onPromptChange('');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full">
      <span
        ref={measureRef}
        className="invisible absolute text-sm whitespace-pre"
        aria-hidden="true"
      />
      
      <div className="w-full max-w-full mb-4">
        <Textarea 
          value={currentPrompt}
          onChange={(e) => {
            setCurrentPrompt(e.target.value);
            onPromptChange(e.target.value);
          }} 
          placeholder="Enter your prompt here..." 
          className="w-full bg-white min-h-32"
        />
      </div>
      
      <div className="flex flex-row items-center gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleShuffle}
        >
          <Shuffle className="w-4 h-4" />
          Shuffle Prompt
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleClear}
          size="sm"
        >
          Clear
        </Button>
      </div>
    </div>
  );
});

PromptForm.displayName = 'PromptForm';
export default PromptForm;