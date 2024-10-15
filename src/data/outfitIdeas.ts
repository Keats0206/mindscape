export interface OutfitIdea {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
  }
  
export const outfitIdeas: OutfitIdea[] = [
    {
      id: 1,
      title: "Taylor Swift Concert Outfit",
      description: "A chic and trendy ensemble perfect for rocking out at a Taylor Swift concert.",
      imageUrl: "/images/outfits/taylor_swift_concert.jpg",
      tags: ["concert", "pop", "stylish"],
    },
    {
      id: 2,
      title: "Fall Casual Look",
      description: "Stay warm and fashionable with this cozy fall outfit.",
      imageUrl: "/images/outfits/fall_casual.jpg",
      tags: ["fall", "casual", "warm"],
    },
    {
      id: 3,
      title: "Summer Beach Vibes",
      description: "Light and breezy outfit ideal for a day at the beach.",
      imageUrl: "/images/outfits/summer_beach.jpg",
      tags: ["summer", "beach", "lightweight"],
    },
    {
      id: 4,
      title: "Winter Wonderland",
      description: "Bundled up in style for the chilly winter months.",
      imageUrl: "/images/outfits/winter_wonderland.jpg",
      tags: ["winter", "warm", "stylish"],
    },
    {
      id: 5,
      title: "Spring Floral Dress",
      description: "A beautiful floral dress perfect for spring outings.",
      imageUrl: "/images/outfits/spring_floral.jpg",
      tags: ["spring", "floral", "dress"],
    },
    {
      id: 6,
      title: "Autumn Layering",
      description: "Layered outfit to keep you comfortable during the autumn season.",
      imageUrl: "/images/outfits/autumn_layering.jpg",
      tags: ["autumn", "layering", "comfortable"],
    },
    {
      id: 7,
      title: "Casual Street Style",
      description: "Effortlessly cool street style for everyday wear.",
      imageUrl: "/images/outfits/street_style.jpg",
      tags: ["street", "casual", "cool"],
    },
    {
      id: 8,
      title: "Elegant Evening Wear",
      description: "Sophisticated outfit choice for elegant evening events.",
      imageUrl: "/images/outfits/elegant_evening.jpg",
      tags: ["evening", "elegant", "formal"],
    },
];

// Utility to extract unique tags
export const getUniqueTags = (): string[] => {
    const tagSet = new Set<string>();
    outfitIdeas.forEach((idea) => {
      idea.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
};