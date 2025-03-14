// Define the options
export const promptOptions = {
  imageOf: [
    "woman", "man", "girl", "guy", "college student", 
    "working professional", "stylish senior", "trendy couple", 
    "fashion influencer", "celebrity lookalike", "diverse group"
  ],
  
  style: [
    "Old Money Aesthetic", "Y2K Fashion", "Cottagecore",
    "Dark Academia", "Barbiecore", "Coastal Grandmother",
    "Gorpcore", "Regencycore", "Cyberpunk",
    "Avant-garde Couture",
    // Additional style-related items from dressedInOptions
    "vintage inspired outfit", "sustainable eco-friendly clothes", 
    "high fashion designer piece", "boho chic outfit",
    "business casual attire", "athleisure wear", 
    "minimalist fashion", "streetwear look", "trendy outfit", 
    "evening gown"
  ],
  
  accessories: [
    "statement sneakers", "oversized sunglasses", "layered gold jewelry",
    "colorful hair accessories", "trendy belt bag", "chunky platform shoes",
    "silk scarf", "designer watch", "sustainable tote bag",
    "retro-inspired hat", "leather boots", "leather gloves", 
    "leather belt", "leather backpack", "leather wallet", 
    "leather phone case",
    // Additional accessories from dressedInOptions
    "leather jacket", "sunglasses", "necklace", "hat", 
    "belt bag", "platform shoes", "scarf", "watch", "tote bag"
  ],
  
  location: [
    "bustling city street", "cozy coffee shop", "picturesque beach",
    "trendy rooftop bar", "rustic barn venue", "luxurious hotel lobby",
    "Instagram-worthy mural wall", "autumn park", "neon-lit urban alley",
    "chic art gallery",
    // Additional context from eventOptions
    "Taylor Swift concert", "country music festival", "Barbie movie premiere",
    "brunch with friends", "Thanksgiving dinner", "summer wedding",
    "college graduation", "first date"
  ],
  
  framing: [
    "full body portrait", "close up", "headshot", "group photo", "action shot",
    "close up of the face", "wide angle shot", "zoomed in on the eyes", "angled shot"
  ]
} as const;