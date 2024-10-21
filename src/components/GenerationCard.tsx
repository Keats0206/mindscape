"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Generation } from "@/types";

export const GenerationCard = ({ generation, isPending = false }: { generation: Generation; isPending?: boolean }) => {
    const [didCopy, setDidCopy] = useState(false);

    function handleCopy(prompt: string) {
      navigator.clipboard.writeText(prompt);
      setDidCopy(true);
      setTimeout(() => {
        setDidCopy(false);
      }, 2000);
    }
  
    return (
      <Card key={generation.id} className={`flex flex-col justify-between overflow-hidden transition-transform duration-300 ${isPending ? 'animate-pulse' : ''}`}>
        <CardHeader className="p-0">
          {isPending ? (
            <div className="w-full h-[200px] bg-gray-200" />
          ) : (
            <Image
              src={generation.result_url || "/decor.png"}
              alt={generation.prompt}
              width={600}
              height={200}
              className="object-cover overflow-hidden"
            />
          )}
        </CardHeader>
        <CardContent className="px-4 py-2 h-full flex flex-col">
          {isPending ? (
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          ) : (
            <div className="h-full text-gray-500 text-sm pb-2">{generation.prompt}</div>
          )}
        </CardContent>
        <CardContent className="flex flex-wrap px-2 gap-1 pb-2">
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={() => handleCopy(generation.prompt)}
            disabled={isPending}
          >
            <CopyIcon className="mr-2" size={16}/>
            {didCopy ? 'Copied!' : 'Copy Prompt'}
          </Button>
        </CardContent>
      </Card>
    );
  }