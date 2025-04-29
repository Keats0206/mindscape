'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GeneratedImages = memo(({ 
    items, 
    isGenerating 
  }: { 
    items: Array<{text: string, image: string}>;
    isGenerating: boolean;
  }) => {
    // Function to handle image download
    const handleDownload = async (imageUrl: string, promptText: string, index: number) => {
      try {
        // Fetch the image as a blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Create a download link and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        // Create a better filename for the generation
        // Extract any ID from the image URL path if available
        const urlPathParts = imageUrl.split('/');
        const possibleId = urlPathParts[urlPathParts.length - 2]; // Try to get the folder name (user ID or generation ID)
        
        // Format date for better readability in filename
        const date = new Date();
        const formattedDate = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}`;
        
        // Create a clean version of the prompt for the filename
        const cleanPrompt = promptText.slice(0, 30).trim()
          .toLowerCase()
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/[^\w\-]/g, '');  // Remove special characters
          
        // Construct the filename with more meaningful information
        const fileName = `tattoo_${formattedDate}_${index+1}${possibleId ? `_${possibleId}` : ''}_${cleanPrompt}.png`;
        
        a.download = fileName;
        
        // Append to the body, click, and cleanup
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    };

    return (
      <div className='w-full bg-white'>
        <div className="max-h-screen p-4 overflow-y-scroll w-full grid grid-cols-2 gap-4">
          {isGenerating && (
            <div className="flex flex-col space-y-2">
              <Skeleton className="w-full aspect-square rounded-md" />
              <Skeleton className="w-full h-2 rounded-md" />
              <Skeleton className="w-full h-2 rounded-md" />
            </div>
          )}
          {items.map(({ text, image }, index) => (
            <Dialog key={index}>
              <div className="text-center flex flex-col items-center w-full relative group">
                <DialogTrigger className="w-full">
                  <Image
                    src={image}
                    alt={text}
                    width={512}
                    height={512}
                    className="rounded-xl"
                    placeholder="blur"
                    blurDataURL={image}
                  />
                </DialogTrigger>
                {/* Download button for grid view - appears on hover */}
                <Button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dialog from opening
                    handleDownload(image, text, index);
                  }}
                  size="icon"
                  variant="ghost" 
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white 
                            opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Download image"
                >
                  <Download size={18} />
                </Button>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{text}</p>
              </div>
              <DialogContent className='h-screen max-w-screen'> 
                <div className='pt-12 flex w-full h-full flex flex-col items-center justify-center relative'>
                  <Image
                    src={image}
                    alt={text}
                    width={720}
                    height={720}
                    className="rounded-xl"
                    placeholder="blur"
                    blurDataURL={image}
                  />
                  {/* Download button for dialog view - always visible */}
                  <Button 
                    onClick={() => handleDownload(image, text, index)}
                    variant="default" 
                    className="absolute top-16 right-4 bg-black/50 hover:bg-black/70 flex items-center gap-2 px-3"
                    title="Download image"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </Button>
                  <p className="mt-2 text-sm text-gray-600 text-center">{text}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {items.length === 0 && !isGenerating && (
          <div className='max-w-full p-24 text-center text-gray-500 w-full md:h-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center max-w-[500px] md:mb-24'>
                No generations yet. Start creating on the left using your own ideas or try the shuffle button!
            </div>
          </div>
        )}
      </div>
    );
  });
  GeneratedImages.displayName = 'GeneratedImages';
  export default GeneratedImages;