"use client";

import Image from 'next/image';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Generation } from "@/types";

export const GenerationCard = ({ generation, isPending = false }: { generation: Generation; isPending?: boolean }) => {
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
              placeholder="blur"
              blurDataURL={generation.result_url || "/decor.png"}
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
      </Card>
    );
  }