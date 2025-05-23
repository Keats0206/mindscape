"use client";

import { useState, memo, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';
import { Shuffle, Upload, X } from 'lucide-react';
import { GenApp } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface PromptFormProps {
  onPromptChange: (prompt: string) => void;
  onImageChange?: (imageFile: File | null) => void;
  genApp: GenApp;
}

const PromptForm = memo(({ onPromptChange, onImageChange, genApp }: PromptFormProps) => {
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShuffle = () => {
    track('Shuffle');
    
    if (!genApp.samplePrompts || genApp.samplePrompts.length === 0) return;
    
    // Get random prompt from samplePrompts
    const randomIndex = Math.floor(Math.random() * genApp.samplePrompts.length);
    const randomPrompt = genApp.samplePrompts[randomIndex];
    
    setCurrentPrompt(randomPrompt);
    onPromptChange(randomPrompt);
  };

  const handleClear = () => {
    track('Clear');
    setCurrentPrompt('');
    onPromptChange('');
    
    if (onImageChange && imagePreview) {
      setImagePreview(null);
      onImageChange(null);
    }
  };
  
  const handleImageUpload = useCallback((file: File) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
        if (onImageChange) {
          onImageChange(file);
        }
      }
    };
    reader.readAsDataURL(file);
  }, [onImageChange]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImagePreview(null);
    if (onImageChange) {
      onImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const showTextInput = genApp.inputType === 'text' || genApp.inputType === 'both' || !genApp.inputType;
  const showImageInput = genApp.inputType === 'image' || genApp.inputType === 'both';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
      {showTextInput && (
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
      )}
      
      {showImageInput && (
        <div className="w-full mb-4">
          {imagePreview ? (
            <div className="relative w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image 
                  src={imagePreview}
                  alt="Uploaded image"
                  fill
                  className="object-cover"
                />
              </div>
              <button 
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 rounded-full bg-gray-800 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-900">
                Drag and drop an image, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-row items-center gap-2">
        {showTextInput && (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleShuffle}
            disabled={!genApp.samplePrompts || genApp.samplePrompts.length === 0}
        >
          <Shuffle className="w-4 h-4" />
          Shuffle Prompt
        </Button>
        )}
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