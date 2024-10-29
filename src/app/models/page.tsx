import React from 'react';
import { models } from '@/data/modelData';
import { Model } from '@/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModelsPage() {

  return (
    <div className="flex flex-col gap-4 w-screen px-4 sm:px-6 lg:px-8 pt-16">
      <div className="w-full flex flex-col gap-2 h-48 items-center justify-center">
        <h1 className="text-4xl font-bold pb-2">Models</h1>
        <p className="text-xl text-gray-500 text-center">Explore our curated selection of models, more coming soon...including the create your own.</p>
      </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
        {models.map((model: Model) => (
        <Card key={model.id}>
          <CardHeader>
            <CardTitle>{model.name}</CardTitle>
            <CardDescription>{model.description}</CardDescription>
          </CardHeader>   
        </Card>
        ))}
      </div>
    </div>
  );
}