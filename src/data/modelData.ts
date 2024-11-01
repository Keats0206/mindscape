import { Model, GenApp } from '@/types';

export const models: Model[] = [
    {
    id: 0,
    image:"https://picsum.photos/200",
    name: 'GenspoAI',
    value: 'black-forest-labs/flux-dev',
    description: 'Generate anything, our flagship model.'
    },
  ]

export const genApps: GenApp[] = [
  {
    id: 'outfit-generator',
    name: 'OutfitAI',
    description: 'Generate fashion inspiration',
    creatorID: '1',
    creatorUsername: 'GenspoAI',
    coverImage: "/OutfitAI.webp",
    model: models[0],
    promptForm: {
      id: 'outfit-prompt',
      name: 'Style Generator',
      description: 'Generate fashion inspiration',
      promptLines: [
        {
          id: 'person',
          text: 'A portrait of',
          placeholder: 'a stylish brunette woman in her mid-20s',
          options: [
            'a young brunette woman',
            'a blonde woman in her mid-20s',
            'a confident red-haired woman',
            'a tall, stylish man with dark hair',
            'a fashionable plus-sized woman'
          ]
        },
        {
          id: 'outfit',
          text: 'wearing',
          placeholder: 'a flowing lavender dress with ruffles',
          options: [
            'a white lace sundress',
            'a gold fringe dress',
            'a red plaid skirt',
            'a black leather jacket',
            'a pastel blue'
          ]
        },
        {
          id: 'accessories',
          text: 'styled with',
          placeholder: 'butterfly earrings and a straw hat',
          options: [
            'butterfly earrings',
            'silver rings',
            'a red beret',
            'snake jewelry',
            'chunky sneakers'
          ]
        },
        {
          id: 'location',
          text: 'shot in a',
          placeholder: 'a countryside field with wildflowers',
          options: [
            'countryside field',
            'vibrant festival',
            'autumnal city',
            'edgy urban setting',
            'sunny beach'
          ]
        },
        {
          id: 'vibe',
          text: 'with a',
          placeholder: 'peaceful and dreamy vibe',
          options: [
            'peaceful and innocent vibe',
            'carefree and energetic vibe',
            'rebellious and vintage-inspired vibe',
            'fierce and confident vibe',
            'serene and romantic vibe',
            'warm, golden-hour lighting',
            'bright, sparkly festival lighting',
            'golden autumn lighting',
            'dramatic, moody lighting',
            'soft, diffused sunlight',
            'nostalgic vibe',
            'playful festival vibe',
            'cozy and chic autumnal feel',
            'dark and mysterious atmosphere',
            'romantic and whimsical setting'
          ]
        }
      ]
    }
  },
  {
    id: 'tattoo-generator',
    name: 'TattooAI',
    description: 'Create personalized tattoo designs with AI',
    creatorID: '2',
    creatorUsername: 'TattooGenie',
    coverImage: "/TattooAI.webp",
    model: models[1],
    promptForm: {
      id: 'tattoo-prompt',
      name: 'Tattoo Design Generator',
      description: 'Generate custom tattoo ideas and designs',
      promptLines: [
        {
          id: 'idea',
          text: 'Enter your tattoo idea',
          placeholder: 'a majestic wolf with roses',
          options: []
        },
        {
          id: 'style',
          text: 'Select a style',
          placeholder: 'Choose your preferred style',
          options: [
            'Geometric',
            'Watercolor',
            'Dotwork',
            'Old School',
            'Minimalist',
            '3D',
            'Blackwork',
            'Negative Space',
            'Japanese',
            'Realistic',
            'Tribal',
            'Cartoon',
            'Surreal'
          ]
        },
        {
          id: 'color',
          text: 'Choose colors',
          placeholder: 'Color options for your tattoo',
          options: [
            'Colorful',
            'Black and White',
            'Pastel',
            'Bold Colors',
            'Monochrome'
          ]
        },
        {
          id: 'placement',
          text: 'Tattoo placement',
          placeholder: 'Where do you want the tattoo?',
          options: [
            'Arm',
            'Back',
            'Leg',
            'Chest',
            'Wrist',
            'Ankle',
            'Shoulder'
          ]
        }
      ]
    }
  },
];