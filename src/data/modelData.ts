import { Model, GenApp } from '@/types';

// The base model that all GenApps will use
export const baseModel: Model = {
      id: 0,
  image: "https://picsum.photos/200",
  name: 'Flux Dev LORA',
  value: 'black-forest-labs/flux-dev-lora',
  description: 'Our versatile base model with LORA support.'
};

// Different GenApps with various LORA weights
  const tattooGenApp: GenApp = {
    id: 'tattoo-generator',
    name: 'Tattoo Designs',
    description: 'Create meaningful, personalized tattoo designs with AI',
    creatorID: '2',
    creatorUsername: 'TattooGenie',
    coverImage: "/TattooAI.webp",
    model: baseModel,
    inputType: 'text',
    loraWeights: 'fofr/tattoo-style',
    samplePrompts: [
      'Create a phoenix rising from ashes in neo-traditional style',
      'Design a minimalist mountain range tattoo for forearm',
      'Generate a sacred geometry lotus flower with dotwork shading',
      'Design a traditional Japanese dragon sleeve tattoo',
      'Create a small watercolor wolf tattoo'
  ]
};

const vintageAdGenApp: GenApp = {
  id: 'vintage-ad-generator',
  name: 'Vintage Ads',
  description: 'Create vintage-style advertisements with AI',
  creatorID: '3',
  creatorUsername: 'VintageAds',
  coverImage: "/vintageads.png",
  model: baseModel,
  inputType: 'text',
  loraWeights: 'multimodalart/vintage-ads',
  samplePrompts: [
    'Create a vintage-style advertisement for a car',
    'Create a vintage-style advertisement for a watch',
  ]
};

export const genApps: GenApp[] = [
  tattooGenApp,
  vintageAdGenApp
];
