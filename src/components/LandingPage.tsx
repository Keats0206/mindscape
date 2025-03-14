"use client";

import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { genApps } from "@/data/modelData";
import { GenApp } from "@/types";

export function LandingPage() {  
  return (
    <div className="w-screen h-screen">
      <div className="z-20 flex flex-col items-center justify-center w-full h-full absolute">
        <div className="flex flex-col items-center justify-center p-12 rounded-xl bg-white text-4xl w-auto max-w-xl text-center">
          <div className='flex flex-row font-medium text-3xl items-center font-semibold'>
            <div>An AI Inspiration Engine</div>
          </div>
          <div className="text-xl text-gray-500 pt-4">
            Generate infinite inspiration with custom AI models for outfits, interior designs and more
          </div>
          <div className="flex flex-row gap-2 pt-4">
            <Link href="/signup">
              <Button> Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline"> Log In</Button>
            </Link>
          </div>
        </div>
      </div>
       <MarqueeDemo />
    </div>
  );
}
 
const GenAppCard = ({
  genApp
}: {
  genApp: GenApp;
}) => {
  return (
    <div>
      <div className="w-80 flex flex-row items-center rounded-md border border-gray-200">
        <div className='w-80 h-full p-4 flex flex-col gap-2'>
            <div className='w-72 h-72 bg-gray-200 rounded-md'>
              <Image 
                src={genApp.coverImage} 
                alt={genApp.model.name} 
                width={72}
                height={72}
                className='w-full h-full object-cover rounded-md aspect-square' 
              />
            </div>
            <div className='flex flex-col items-start'>
              <div className='text-lg font-bold'>{genApp.name}</div>
              <div className='text-gray-500 line-clamp-1 overflow-hidden'>{genApp.description}</div> 
            </div>  
          </div>
        </div>
    </div>
  );
};
 
export function MarqueeDemo() {
  return (
    <div className="mah-screen pt-24 relative flex w-full flex-col items-center justify-center overflow-hidden rounded">
      <Marquee pauseOnHover className="[--duration:30s]">
        {genApps.map((genApp) => (
          <GenAppCard key={genApp.name} genApp={genApp} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {genApps.map((genApp) => (
          <GenAppCard key={genApp.name} genApp={genApp} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}