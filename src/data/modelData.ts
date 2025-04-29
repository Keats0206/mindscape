import { Model, GenApp } from '@/types';

export const models: Model[] = [
    {
      id: 0,
      image:"https://picsum.photos/200",
      name: 'TattooAI',
      value: 'black-forest-labs/flux-dev',
      description: 'Generate anything, our flagship model.'
    },
  ]

  const tattooGenApp: GenApp = {
    id: 'tattoo-generator',
    name: 'TattooAI',
    description: 'Create meaningful, personalized tattoo designs with AI',
    creatorID: '2',
    creatorUsername: 'TattooGenie',
    coverImage: "/TattooAI.webp",
    model: models[0],
    promptForm: {
      id: 'tattoo-prompt',
      name: 'Custom Tattoo Designer',
      description: 'Transform your ideas into unique tattoo designs',
      promptLines: [
        {
          id: 'concept',
          text: 'Create a tattoo of',
          placeholder: 'a majestic wolf howling at the moon',
          options: [
            // Spiritual & Meaningful
            'a phoenix rising from ashes',
            'a lotus flower blooming',
            'an intricate mandala',
            'a sacred tree of life',
            'a protective dragon',
            'a spiritual compass rose',
            
            // Nature & Animals
            'a prowling wolf with moon',
            'an owl with ancient symbols',
            'a graceful koi fish',
            'cherry blossoms in wind',
            'mountains under stars',
            'a snake wrapped around roses',
            
            // Symbolic & Popular
            'an anchor with rope',
            'a dreamcatcher with feathers',
            'a crowned lion',
            'wings with clock',
            'a compass with map',
            'crossed arrows with flowers',
            
            // Cultural & Artistic
            'a samurai warrior',
            'a sugar skull with flowers',
            'a mermaid on rocks',
            'a Japanese dragon',
            'zodiac constellation',
            
            // Matching categories
            'a bold black tribal pattern',
            'a detailed watercolor splash design',
            'a geometric wolf with sacred shapes',
            'a realistic portrait of a dragon',
            'a biomechanical sleeve design',
            'a minimalist lotus linework'
          ]
        },
        {
          id: 'style',
          text: 'designed in',
          placeholder: 'a geometric style with fine lines',
          options: [
            // Modern Styles
            'modern minimalist linework',
            'abstract geometric patterns',
            'contemporary dotwork',
            'watercolor splashes',
            'realistic 3D shading',
            
            // Traditional Styles
            'traditional American bold lines',
            'Japanese irezumi style',
            'vintage nautical art',
            'neo-traditional color',
            'tribal blackwork',
            
            // Artistic Styles
            'sketch art style',
            'surreal double exposure',
            'negative space illusion',
            'illustrative fine line',
            'cosmic watercolor blend',
            
            // Matching categories
            'geometric sacred patterns',
            'fine line Chicano art',
            'blackwork with bold shading',
            'trash polka with abstract sketches',
            'greyscale shading with depth',
            'biomechanical robotic detail'
          ]
        },
        {
          id: 'elements',
          text: 'incorporated with',
          placeholder: 'sacred geometry and flowing ribbons',
          options: [
            'sacred geometry patterns',
            'flowing botanical elements',
            'celestial moon and stars',
            'ornamental mandalas',
            'ancient runes and symbols',
            'delicate dot shading',
            'organic flowing lines',
            'crystal formations',
            'smoke and cloud effects',
            'geometric sacred shapes',
            'vintage scroll work',
            'depth-creating shadows',
            
            // Matching categories
            'biomechanical robotic details',
            'Japanese waves and koi',
            'tribal line patterns',
            'watercolor cosmic splashes',
            'realistic portrait shading',
            'geometric abstract forms'
          ]
        },
        {
          id: 'color',
          text: 'using',
          placeholder: 'deep blues and cosmic purples',
          options: [
            // Color Schemes
            'bold traditional colors',
            'soft watercolor blend',
            'deep cosmic blues and purples',
            'earth tones and metallics',
            'pastel gradient fade',
            'vivid neon accents',
            
            // Monochrome
            'clean black linework',
            'grayscale shading',
            'bold blackwork',
            'fine gray wash',
            'stark black negative space',
            'subtle gray dotwork',
            
            // Matching categories
            'tribal black ink',
            'realistic 3D shading',
            'bright red trash polka accents',
            'watercolor pastel tones',
            'geometric black and gray contrast',
            'Chicano greyscale shading'
          ]
        },
        {
          id: 'placement',
          text: 'visualized on',
          placeholder: 'the inner forearm',
          options: [
            // Arms
            'full sleeve canvas',
            'inner forearm',
            'outer bicep',
            'delicate wrist',
            
            // Torso
            'ribcage side panel',
            'full back canvas',
            'chest piece',
            'shoulder cap',
            
            // Legs
            'thigh panel',
            'calf muscle',
            'ankle wrap',
            'foot top',
            
            // Matching categories
            'biomechanical sleeve',
            'tribal ribcage side panel',
            'Japanese back piece',
            'geometric thigh design',
            'realistic portrait on chest',
            'watercolor arm wrap'
          ]
        },
        {
          id: 'size',
          text: 'sized as',
          placeholder: 'a medium 6-inch design',
          options: [
            'small 2-3 inch detail',
            'medium 4-6 inch design',
            'large 7-9 inch piece',
            'extra large 10+ inch art',
            'full panel coverage',
            'micro fine detail',
            'wraparound design',
            
            // Matching categories
            'large biomechanical piece',
            'medium geometric design',
            'small fine-line minimalist tattoo',
            'full back tribal piece',
            'extra large watercolor art',
            'small detailed portrait'
          ]
        }
      ]
    }
  };

export const genApps: GenApp[] = [
  tattooGenApp,
];
