"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { GenApp } from "@/types";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const GenAppCard = ({
    genApp,
  }: {
    genApp: GenApp;
  }) => {
    const [copied, setCopied] = useState(false);
    // Fallback image for error cases
    const fallbackImage = "/placeholder-image.webp";

    const handleCopy = () => {
      const textToCopy = `${genApp.model.name}/${genApp.loraWeights}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <Card className="w-full hover:shadow-md transition-shadow duration-300">
          <CardHeader>
              <CardTitle>{genApp.name}</CardTitle>
              <CardDescription>{genApp.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md overflow-hidden relative"> 
              <Image 
                src={genApp.coverImage}
                alt={genApp.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-between">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              {genApp.loraWeights}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 hover:bg-gray-100"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500 transition-all duration-200" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500 transition-all duration-200" />
                )}
              </Button>
            </div>
          </CardFooter>
      </Card>
    );
  };
   