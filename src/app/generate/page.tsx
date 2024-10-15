"use client"

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { outfitIdeas, getUniqueTags, OutfitIdea } from "@/data/outfitIdeas";
import { Checkbox } from "@/components/ui/checkbox"; // Importing Checkbox from ShadUI
import { Check } from "lucide-react"; // Icon for the Checkbox if needed
import { Button } from "@/components/ui/button";

export default function Home() {
  const uniqueTags = getUniqueTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredOutfitIdeas = selectedTags.length
    ? outfitIdeas.filter((idea) =>
        selectedTags.every((tag) => idea.tags.includes(tag))
      )
    : outfitIdeas;

  return (
    <div className="p-12 w-screen flex flex-row">
      <div className="w-[300px]">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-col space-y-2">
          {uniqueTags.map((tag) => (
            <label key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`checkbox-${tag}`}
                name={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagChange(tag)}
              >
                <Check className="h-4 w-4" />
              </Checkbox>
              <span className="capitalize">{tag}</span>
            </label>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <Button
            onClick={() => setSelectedTags([])}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredOutfitIdeas.length ? (
          filteredOutfitIdeas.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="object-cover"
                />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{item.tags.join(", ")}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-3 text-center">No outfit ideas match the selected filters.</p>
        )}
      </div>
    </div>
  );
}