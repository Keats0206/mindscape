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
            'zodiac constellation'
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
            'cosmic watercolor blend'
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
            'depth-creating shadows'
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
            'subtle gray dotwork'
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
            'foot top'
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
            'wraparound design'
          ]
        }
      ]
    }
  }

  const outfitGenApp: GenApp = 
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
    }

    const interiorGenApp: GenApp = {
      id: 'interior-generator',
      name: 'InteriorAI',
      description: 'Transform your space with AI interior design',
      creatorID: '3',
      creatorUsername: 'InteriorGenie',
      coverImage: "/InteriorAI.webp",
      model: models[0],
      promptForm: {
        id: 'interior-prompt',
        name: 'Room Designer',
        description: 'Generate stunning interior designs for any room',
        promptLines: [
          {
            id: 'room-type',
            text: 'Design a',
            placeholder: 'modern living room',
            options: [
              'cozy living room',
              'minimalist bedroom',
              'luxury bathroom',
              'modern kitchen',
              'home office',
              'dining room',
              'studio apartment',
              'outdoor patio'
            ]
          },
          {
            id: 'style',
            text: 'in',
            placeholder: 'Scandinavian style',
            options: [
              'Scandinavian style',
              'Industrial chic',
              'Bohemian style',
              'Modern farmhouse',
              'Mid-century modern',
              'Contemporary minimal',
              'Coastal beach house',
              'Japanese zen',
              'Art deco inspired',
              'Rustic modern'
            ]
          },
          {
            id: 'color-scheme',
            text: 'with a',
            placeholder: 'neutral color palette with earth tones',
            options: [
              'neutral color palette',
              'monochromatic gray scheme',
              'warm earth tones',
              'bold and vibrant colors',
              'pastel color scheme',
              'black and white contrast',
              'ocean-inspired blues',
              'forest green accents',
              'desert-inspired palette'
            ]
          },
          {
            id: 'features',
            text: 'featuring',
            placeholder: 'large windows and plants',
            options: [
              'large windows and natural light',
              'statement lighting fixtures',
              'custom built-ins',
              'exposed brick walls',
              'indoor plants and greenery',
              'vintage furniture pieces',
              'modern art displays',
              'wooden beam ceilings',
              'marble accents',
              'textured wallpaper'
            ]
          },
          {
            id: 'mood',
            text: 'creating a',
            placeholder: 'calm and relaxing atmosphere',
            options: [
              'calm and relaxing atmosphere',
              'luxurious and elegant feel',
              'warm and inviting space',
              'bright and energetic vibe',
              'cozy and intimate setting',
              'clean and organized look',
              'dramatic and moody ambiance',
              'playful and creative environment',
              'professional and focused atmosphere'
            ]
          },
          {
            id: 'time-of-day',
            text: 'shown during',
            placeholder: 'golden hour lighting',
            options: [
              'morning sunlight',
              'bright midday',
              'golden hour',
              'evening ambiance',
              'night time with mood lighting',
              'rainy day atmosphere',
              'sunny afternoon'
            ]
          }
        ]
      }
    }


   const nailGenApp: GenApp = {
      id: 'nail-generator',
      name: 'NailAI',
      description: 'Create trendy nail art designs personalized to your style',
      creatorID: '4',
      creatorUsername: 'NailArtist',
      coverImage: "/NailAI.webp",
      model: models[0],
      promptForm: {
        id: 'nail-prompt',
        name: 'Nail Art Designer',
        description: 'Generate custom nail designs trending on Pinterest',
        promptLines: [
          {
            id: 'style',
            text: 'Create',
            placeholder: 'elegant almond-shaped nails',
            options: [
              // Shape Trends
              'long almond nails',
              'short square nails',
              'coffin shaped nails',
              'natural rounded nails',
              'stiletto statement nails',
              'short french tips',
              
              // Trending Styles
              'minimal clean nails',
              'chrome effect nails',
              'glazed donut nails',
              'metallic french tips',
              'negative space design',
              'abstract art nails'
            ]
          },
          {
            id: 'color-scheme',
            text: 'using',
            placeholder: 'soft pink with chrome accents',
            options: [
              // Seasonal Colors
              'autumn earth tones',
              'winter frost metallics',
              'summer pastel blend',
              'spring floral hues',
              
              // Trending Combinations
              'chrome and pearl',
              'matte black and gold',
              'neutral nude ombre',
              'pink to purple fade',
              'white with crystal accents',
              'rainbow chrome effect'
            ]
          },
          {
            id: 'design',
            text: 'decorated with',
            placeholder: 'delicate white flowers',
            options: [
              // Seasonal Designs
              'snowflakes and glitter',
              'spring cherry blossoms',
              'summer tropical leaves',
              'fall leaves and gold foil',
              
              // Trending Elements
              '3D crystal effects',
              'minimal line art',
              'abstract swirls',
              'hello kitty motifs',
              'butterfly accents',
              'geometric patterns',
              'marble effect',
              'holographic details'
            ]
          },
          {
            id: 'finish',
            text: 'finished with',
            placeholder: 'glossy top coat and diamonds',
            options: [
              'high shine glossy coat',
              'matte velvet finish',
              'chrome powder effect',
              'holographic sparkle',
              'pearl shimmer coat',
              'sugar frost texture',
              'gel overlay shine',
              'metallic foil accent'
            ]
          },
          {
            id: 'occasion',
            text: 'perfect for',
            placeholder: 'everyday elegant style',
            options: [
              'wedding celebrations',
              'holiday parties',
              'summer beach days',
              'office professional',
              'date night glamour',
              'festival fun',
              'special events',
              'everyday chic'
            ]
          }
        ]
      }
  }

  const wallpaperGenApp: GenApp = {
    id: 'wallpaper-generator',
    name: 'WallpaperAI',
    description: 'Create stunning custom wallpapers for your phone and devices',
    creatorID: '5',
    creatorUsername: 'WallpaperGenie',
    coverImage: "/WallpaperAI.webp",
    model: models[0],
    promptForm: {
      id: 'wallpaper-prompt',
      name: 'Custom Wallpaper Designer',
      description: 'Generate personalized wallpapers that match your vibe',
      promptLines: [
        {
          id: 'style',
          text: 'Create a',
          placeholder: 'dreamy anime aesthetic wallpaper',
          options: [
            // Trending Aesthetics
            'minimalist aesthetic',
            'cottagecore dream',
            'cyber punk scene',
            'kawaii cute style',
            'dark academia mood',
            'retro vaporwave',
            'soft girl aesthetic',
            'grunge aesthetic',
            'ethereal fairy core',
            'space core cosmic',
            'indie kid style',
            'y2k nostalgia'
          ]
        },
        {
          id: 'theme',
          text: 'featuring',
          placeholder: 'a magical girl character with butterflies',
          options: [
            // Character Themes (trending)
            'hello kitty and friends',
            'magical anime girl',
            'cute pokemon style',
            'chibi character art',
            'studio ghibli inspired',
            
            // Nature Themes
            'mystical forest scene',
            'cosmic galaxy swirl',
            'ocean waves sunset',
            'cherry blossom rain',
            'northern lights sky',
            
            // Abstract Themes
            'marble gold swirls',
            'neon geometric shapes',
            'watercolor splashes',
            'minimal line art',
            'crystal formations'
          ]
        },
        {
          id: 'color-scheme',
          text: 'in',
          placeholder: 'pastel pink and purple gradient',
          options: [
            // Trending Color Schemes
            'pastel rainbow blend',
            'dark moody tones',
            'sage green aesthetic',
            'pink and purple dream',
            'blue butterfly theme',
            
            // Aesthetic Combinations
            'rose gold marble',
            'black and neon accent',
            'earthy neutral tones',
            'sunset gradient fade',
            'holographic rainbow',
            'matcha green tea',
            'strawberry milk pink'
          ]
        },
        {
          id: 'elements',
          text: 'with',
          placeholder: 'floating butterflies and stars',
          options: [
            // Decorative Elements
            'floating butterflies',
            'twinkling stars',
            'cherry blossoms',
            'moon phases',
            'cloud patterns',
            'heart decorations',
            'crystal gems',
            'musical notes',
            'cute doodles',
            'anime sparkles',
            'geometric frames',
            'celestial symbols'
          ]
        },
        {
          id: 'mood',
          text: 'creating a',
          placeholder: 'dreamy and peaceful mood',
          options: [
            'dreamy peaceful vibe',
            'energetic happy feel',
            'mysterious dark mood',
            'romantic soft atmosphere',
            'powerful bold energy',
            'calming zen feeling',
            'playful cute mood',
            'nostalgic retro vibe',
            'magical fantasy feel',
            'cozy warm atmosphere'
          ]
        },
        {
          id: 'format',
          text: 'optimized for',
          placeholder: 'iPhone lockscreen',
          options: [
            // Device Options
            'iPhone lock screen',
            'iPhone home screen',
            'Android phone',
            'iPad/tablet',
            'desktop wide screen',
            
            // Special Formats
            'matching phone set',
            'split screen pair',
            'story highlight cover',
            'social media banner',
            'profile picture frame'
          ]
        },
        {
          id: 'extra-features',
          text: 'including',
          placeholder: 'space for time widget',
          options: [
            'clock widget space',
            'notification space',
            'app icon frames',
            'quote overlay',
            'calendar widget area',
            'weather widget space',
            'music player space',
            'minimal icons space',
            'date display area'
          ]
        }
      ]
    }
}

export const genApps: GenApp[] = [
  outfitGenApp,
  tattooGenApp,
  interiorGenApp,
  nailGenApp,
  wallpaperGenApp
];
