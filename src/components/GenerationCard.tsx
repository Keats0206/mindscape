"use client";

import Image from 'next/image';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Generation } from "@/types";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GenerationCard = ({ generation, isPending = false }: { generation: Generation; isPending?: boolean }) => {
    const handleDownload = async () => {
      try {
        const response = await fetch(generation.result_url);
        const blob = await response.blob();
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        const fileName = generation.result_url.split('/').pop() || `tattoo-${Date.now()}.png`;
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    };

    return (
      <Card key={generation.id} className={`flex flex-col justify-between overflow-hidden transition-transform duration-300 ${isPending ? 'animate-pulse' : ''}`}>
        <CardHeader className="p-0 relative">
          {isPending ? (
            <div className="w-full h-[200px] bg-gray-200" />
          ) : (
            <>
              <Image
                src={generation.result_url || "/decor.png"}
                alt={generation.prompt}
                width={600}
                height={200}
                className="object-cover overflow-hidden"
                placeholder="blur"
                blurDataURL={generation.result_url || "/decor.png"}
              />
              <Button 
                onClick={handleDownload}
                size="icon"
                variant="ghost" 
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
                title="Download image"
              >
                <Download size={18} />
              </Button>
            </>
          )}
        </CardHeader>
        <CardContent className="px-4 py-2 h-full flex flex-col">
          {isPending ? (
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          ) : (
            <div className="h-full text-gray-500 text-sm pb-2">{generation.prompt}</div>
          )}
        </CardContent>
      </Card>
    );
  }