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
    id: 'general-generator',
    name: 'GenspoAI',
    description: 'Generate anything, our flagship model.',
    creatorID: '1',
    creatorUsername: 'GenspoAI',
    coverImage: "/GeneralAI.webp",
    model: models[0],
    promptForm: {
      id: 'general-prompt',
      name: 'General Generation',
      description: 'Create any kind of image',
      promptLines: [
        {
          id: 'subject',
          text: 'A photo of',
          placeholder: 'a majestic dragon',
          options: [
            'a majestic dragon',
            'a futuristic city',
            'an enchanted forest',
            'a cosmic space station',
            'an underwater temple'
          ]
        },
        {
          id: 'style',
          text: 'in the style of',
          placeholder: 'digital art',
          options: [
            'digital art',
            'oil painting',
            'watercolor',
            'photorealistic',
            '3D rendering'
          ]
        },
        {
          id: 'mood',
          text: 'with',
          placeholder: 'dramatic lighting',
          options: [
            'dramatic lighting',
            'vibrant colors',
            'moody atmosphere',
            'soft pastels',
            'high contrast'
          ]
        }
      ]
    }
  },
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
          text: 'A photo of',
          placeholder: 'a stylish woman',
          options: [
            'a stylish woman',
            'a fashionable man',
            'a trendy couple',
            'a confident professional',
            'a creative artist'
          ]
        },
        {
          id: 'outfit',
          text: 'wearing',
          placeholder: 'a vintage leather jacket',
          options: [
            'a vintage leather jacket',
            'a tailored suit',
            'a bohemian dress',
            'streetwear',
            'minimalist basics'
          ]
        },
        {
          id: 'accessories',
          text: 'styled with',
          placeholder: 'designer sunglasses',
          options: [
            'designer sunglasses',
            'statement jewelry',
            'a luxury handbag',
            'vintage accessories',
            'modern minimalist pieces'
          ]
        },
        {
          id: 'location',
          text: 'in',
          placeholder: 'an urban street',
          options: [
            'an urban street',
            'a high-end boutique',
            'a fashion week setting',
            'a modern art gallery',
            'a rooftop garden'
          ]
        }
      ]
    }
  },
  {
    id: 'interior-generator',
    name: 'InteriorAI',
    description: 'Generate interior spaces and concepts',
    creatorID: '1',
    creatorUsername: 'GenspoAI',
    coverImage: "/InteriorAI.webp",
    model: models[0],
    promptForm: {
      id: 'interior-prompt',
      name: 'Interior Design',
      description: 'Generate interior spaces',
      promptLines: [
        {
          id: 'room',
          text: 'A',
          placeholder: 'modern living room',
          options: [
            'modern living room',
            'cozy bedroom',
            'luxury bathroom',
            'minimalist kitchen',
            'home office'
          ]
        },
        {
          id: 'style',
          text: 'designed in',
          placeholder: 'Scandinavian style',
          options: [
            'Scandinavian style',
            'mid-century modern',
            'industrial chic',
            'bohemian',
            'contemporary minimal'
          ]
        },
        {
          id: 'features',
          text: 'featuring',
          placeholder: 'natural materials',
          options: [
            'natural materials',
            'statement lighting',
            'bold artwork',
            'indoor plants',
            'custom furniture'
          ]
        },
        {
          id: 'mood',
          text: 'with',
          placeholder: 'warm ambient lighting',
          options: [
            'warm ambient lighting',
            'floor-to-ceiling windows',
            'a cozy fireplace',
            'minimalist decor',
            'luxurious textures'
          ]
        }
      ]
    }
  },
  {
    id: 'halloween-costume-generator',
    name: 'HalloweenAI',
    description: 'Generate creative Halloween costume ideas',
    creatorID: '1',
    creatorUsername: 'GenspoAI',
    coverImage: "/CostumeAI.webp",
    model: models[0],
    promptForm: {
      id: 'halloween-costume-prompt',
      name: 'Halloween Costume',
      description: 'Generate creative Halloween costume ideas',
      promptLines: [
        {
          id: 'character',
          text: 'A costume of',
          placeholder: 'a witchy sorceress',
          options: [
            'a witchy sorceress',
            'a spooky skeleton',
            'a haunted ghost',
            'a creepy clown',
            'a fearsome vampire'
          ]
        },
        {
          id: 'style',
          text: 'in the',
          placeholder: 'gothic',
          options: [
            'gothic',
            'cartoonish',
            'steampunk',
            'minimalist',
            'over-the-top'
          ]
        },
        {
          id: 'accessories',
          text: 'with',
          placeholder: 'eerie props',
          options: [
            'eerie props',
            'dramatic makeup',
            'unique headpieces',
            'spooky lighting',
            'ghoulish details'
          ]
        }
      ]
    }
  },
  {
    id: 'barbie-outfits-generator',
    name: 'BarbieAI',
    description: 'Generate Barbie doll fashion inspiration',
    creatorID: '1',
    creatorUsername: 'GenspoAI',
    coverImage: "/BarbieAI.webp",
    model: models[0],
    promptForm: {
      id: 'barbie-outfit-prompt',
      name: 'Barbie Outfit',
      description: 'Generate Barbie doll fashion inspiration',
      promptLines: [
        {
          id: 'persona',
          text: 'A Barbie doll dressed as a',
          placeholder: 'fashionable socialite',
          options: [
            'fashionable socialite',
            'glamorous movie star',
            'sporty adventurer',
            'elegant royal',
            'creative artist'
          ]
        },
        {
          id: 'outfit',
          text: 'wearing',
          placeholder: 'a couture gown',
          options: [
            'a couture gown',
            'a designer pantsuit',
            'a chic mini dress',
            'a trendy athleisure set',
            'a vintage-inspired look'
          ]
        },
        {
          id: 'accessories',
          text: 'styled with',
          placeholder: 'statement jewelry',
          options: [
            'statement jewelry',
            'a luxury handbag',
            'stylish sunglasses',
            'bold makeup',
            'a fabulous hairstyle'
          ]
        }
      ]
    }
  },
  {
    id: 'taylor-swift-eras-generator',
    name: 'SwiftiesAI',
    description: 'Generate outfits inspired by Taylor Swift\'s musical eras',
    creatorID: '1',
    creatorUsername: 'GenspoAI',
    coverImage: "/ErasAI.webp",
    model: models[0],
    promptForm: {
      id: 'taylor-swift-eras-prompt',
      name: 'Taylor Swift Eras',
      description: 'Generate outfits inspired by Taylor Swift\'s musical eras',
      promptLines: [
        {
          id: 'era',
          text: 'An outfit inspired by Taylor Swift\'s',
          placeholder: 'Folklore era',
          options: [
            'Folklore era',
            'Reputation era',
            'Lover era',
            'Evermore era',
            'Midnights era'
          ]
        },
        {
          id: 'style',
          text: 'with a',
          placeholder: 'cozy, ethereal vibe',
          options: [
            'cozy, ethereal vibe',
            'dark, moody aesthetic',
            'vibrant, romantic style',
            'serene, nature-inspired look',
            'sleek, modern sophistication'
          ]
        },
        {
          id: 'key-pieces',
          text: 'featuring',
          placeholder: 'an oversized cardigan',
          options: [
            'an oversized cardigan',
            'a sleek black bodysuit',
            'a flowy floral dress',
            'a tailored pantsuit',
            'a shimmering mini skirt'
          ]
        }
      ]
    }
  }
];