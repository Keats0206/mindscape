import React from 'react';
import { genApps } from '@/data/modelData';
import { GenApp } from '@/types';
import { GenAppCard } from '@/components/GenAppCard';

export default function ModelsPage() {
  return (
    <div className="flex flex-col gap-4 w-screen pt-16 px-4">
      <div className="w-full flex flex-col gap-2 h-48 items-center justify-center">
        <h1 className="text-4xl font-bold pb-2">Models</h1>
        <p className="text-xl text-gray-500 text-center">Explore our curated selection of models, more coming soon...including the create your own.</p>
      </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
        {genApps.map((genApp: GenApp) => (
          <GenAppCard key={genApp.id} genApp={genApp} />
        ))}
      </div>
    </div>
  );
}