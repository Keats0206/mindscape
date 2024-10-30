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
            'a white lace sundress with cowboy boots',
            'a gold fringe dress with denim shorts',
            'a red plaid skirt with an oversized sweater',
            'a black leather jacket and fitted mini dress',
            'a pastel blue two-piece summer set'
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
];