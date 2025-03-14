"use client";

import { useState } from "react";
import { GenApp } from "@/types";
import { GenerationCard } from "@/components/GenerationCard";
import Image from "next/image";
import { genApps } from "@/data/modelData";
import Link from "next/link";
import { Generation } from "@/types";
import SignUpCTA from "./SignUpCTA";
import { CompleteUserData } from "@/types";

const sampleGenerations: Generation[] = [
  {
    "id": "94565960-fe91-4526-a082-b6acff76c8b9",
    "user_id": "954fed97-a69f-4b67-822a-a3aea4c05a84",
    "type": "image",
    "prompt": "man Old Money Aesthetic necklace country music festival full body portrait",
    "result_url": "https://hesyocjkoaxwlbgbaabq.supabase.co/storage/v1/object/public/generations/954fed97-a69f-4b67-822a-a3aea4c05a84/1729686780251.webp",
    "tags": ["man", "old", "money", "aesthetic", "necklace", "country", "music", "festival", "full", "body", "portrait", "outfit", "inspiration", "ideas", "fashion", "style", "look"],
    "is_public": true,
    "model_used": "OutfitAI",
    "created_at": "2024-10-23T12:33:01.567183+00:00"
  },
  {
    "id": "4a35791e-93be-4299-8845-ea12061638e2",
    "user_id": "84e8784d-eca6-4f6c-94d2-41d098b2a9cc",
    "type": "image",
    "prompt": "A photo of a woman dressed in Old Money Aesthetic wearing leather belt shot in country music festival framed as close up of the face",
    "result_url": "https://hesyocjkoaxwlbgbaabq.supabase.co/storage/v1/object/public/generations/84e8784d-eca6-4f6c-94d2-41d098b2a9cc/1729883676298.webp",
    "tags": ["photo", "woman", "dressed", "old", "money", "aesthetic", "wearing", "leather", "belt", "shot", "country", "music", "festival", "framed", "close", "the", "face", "outfit", "inspiration", "ideas", "fashion", "style", "look"],
    "is_public": true,
    "model_used": "OutfitAI",
    "created_at": "2024-10-25T19:14:37.783686+00:00"
  },
  {
    "id": "11712057-10a8-4184-a37e-f83d019ac0ca",
    "user_id": "66872820-9f78-4d61-a2b2-e5a5df0eee5d",
    "type": "image",
    "prompt": "A stylish traveler in a casual travel outfit walking through cobblestone streets – Dressed in a relaxed linen shirt, comfortable trousers, and leather sandals, she carries a woven tote and wears a sun hat, capturing a laid-back vacation vibe.",
    "result_url": "https://hesyocjkoaxwlbgbaabq.supabase.co/storage/v1/object/public/generations/66872820-9f78-4d61-a2b2-e5a5df0eee5d/1731376653739.webp",
    "tags": ["stylish", "traveler", "casual", "travel", "outfit", "walking", "through", "cobblestone", "streets", "dressed", "relaxed", "linen", "shirt", "comfortable", "trousers", "and", "leather", "sandals", "she", "carries", "woven", "tote", "and", "wears", "sun", "hat", "capturing", "laid-back", "vacation", "vibe", "outfit", "inspiration", "ideas", "fashion", "style", "look"],
    "is_public": true,
    "model_used": "GenspoAI",
    "created_at": "2024-11-12T01:57:34.601339+00:00"
  },
  {
    "id": "81bcc12f-39b6-4b1e-ad45-4a800aefd2fb",
    "user_id": "66872820-9f78-4d61-a2b2-e5a5df0eee5d",
    "type": "image",
    "prompt": "A close-up of a travel outfit laid out on a bed in a hotel room – The set includes a pair of stylish jeans, a soft T-shirt, comfortable sneakers, and accessories like sunglasses, a passport, and a travel guidebook, all ready for the next adventure.",
    "result_url": "https://hesyocjkoaxwlbgbaabq.supabase.co/storage/v1/object/public/generations/66872820-9f78-4d61-a2b2-e5a5df0eee5d/1731376663591.webp",
    "tags": ["close-up", "travel", "outfit", "laid", "out", "bed", "hotel", "room", "the", "set", "includes", "pair", "stylish", "jeans", "soft", "t-shirt", "comfortable", "sneakers", "and", "accessories", "like", "sunglasses", "passport", "and", "travel", "guidebook", "all", "ready", "for", "the", "next", "adventure", "outfit", "inspiration", "ideas", "fashion", "style", "look"],
    "is_public": true,
    "model_used": "GenspoAI",
    "created_at": "2024-11-12T01:57:44.50974+00:00"
  },
  {
    "id": "d47c43ac-556a-472f-9dfc-65e12688c85c",
    "user_id": "954fed97-a69f-4b67-822a-a3aea4c05a84",
    "type": "image", 
    "prompt": "diverse group high fashion designer piece colorful hair accessories country music festival action shot",
    "result_url": "https://hesyocjkoaxwlbgbaabq.supabase.co/storage/v1/object/public/generations/954fed97-a69f-4b67-822a-a3aea4c05a84/1729690825612.webp",
    "tags": ["diverse", "group", "high", "fashion", "designer", "piece", "colorful", "hair", "accessories", "country", "music", "festival", "action", "shot", "outfit", "inspiration", "ideas", "fashion", "style", "look"],
    "is_public": true,
    "model_used": "OutfitAI",
    "created_at": "2024-10-23T13:40:27.613132+00:00"
  },
  {
    "id": "540bd889-3f3e-45eb-9c14-41a643b4ca32",
    "user_id": "66872820-9f78-4d61-a2b2-e5a5df0eee5d",
    "type": "image",
    "prompt": "A photo of a woman in a chic travel outfit at an airport lounge – She wears a cozy oversized sweater, high-waisted jeans, and white sneakers, with a stylish carry-on bag beside her, ready for a comfortable and stylish journey.",
    "result_url": "https://hesyocjkoaxwlbgbaabq.supabase.co/storage/v1/object/public/generations/66872820-9f78-4d61-a2b2-e5a5df0eee5d/1731376649414.webp",
    "tags": ["photo", "woman", "chic", "travel", "outfit", "airport", "lounge", "she", "wears", "cozy", "oversized", "sweater", "high-waisted", "jeans", "and", "white", "sneakers", "with", "stylish", "carry-on", "bag", "beside", "her", "ready", "for", "comfortable", "and", "stylish", "journey", "outfit", "inspiration", "ideas", "fashion", "style", "look"],
    "is_public": true,
    "model_used": "GenspoAI",
    "created_at": "2024-11-12T01:57:30.461998+00:00"
  }
];


function GenAppCard({ genApp }: { genApp: GenApp }) {
  const [randomNumber] = useState(Math.floor(Math.random() * 10000));

  return (
    <div className="hover:bg-stone-200 p-2 flex flex-row gap-2 border border-gray-200 rounded-md">
      <div className="w-20 h-20 bg-gray-200 rounded-md">
        <Image
          src={genApp.coverImage}
          alt={genApp.name}
          width={72}
          height={72}
          className="w-full h-full object-cover rounded-md aspect-square"
          placeholder="blur"
          blurDataURL={genApp.coverImage}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col space-y-2">
          <div className="font-bold">{genApp.name}</div>
          <div className="text-sm text-gray-500 line-clamp-1 overflow-hidden">
            {genApp.description}
          </div>
        </div>
        <div className="text-xs text-gray-500 line-clamp-1 overflow-hidden">
          {randomNumber} generations
        </div>
      </div>
    </div>
  );
}

export default function HomeComponent({ userData }: { userData: CompleteUserData | null }) {
  return (
    <div className="flex flex-col space-y-4 mt-16 p-4 rounded-xl">
      {!userData && (
        <div className="bg-stone-100/50 flex justify-center items-center h-96 w-full border border-gray-200 rounded-xl font-bold text-2xl">
          <SignUpCTA />
        </div>
      )}
      <div className="flex flex-col space-y-4">
        <div className="font-bold">Featured Apps</div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {genApps.map((genApp, i) => (
            <div key={i} className="hover:opacity-80">
              <Link href="/create">
                <GenAppCard genApp={genApp} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="font-bold">Recent Creations</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleGenerations.map((generation, i) => (
              <GenerationCard key={i} generation={generation} />
            ))} 
          </div>
      </div>
    </div>
  );
}