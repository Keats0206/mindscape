import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import { Marquee3D } from '@/components/Marquee3D';
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/utils/cn";
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    redirect('/create');
  }
  
  return (  
    <div className='space-y-4 flex flex-col items-center justify-center h-screen w-screen'>
      <div className='max-w-2xl space-y-4 flex flex-col items-center justify-center'>
          <AnimatedShinyTextDemo />
          <h1 className='text-6xl font-bold text-center'>Generate infinite tattoo ideas with AI</h1>
          <h3 className='text-muted-foreground text-center'>Get inspired by our curated categories or generate a random tattoo idea</h3>
          <div className='gap-4 flex flex-row'>
            <Link href='/signup'>
              <Button>Try for Free</Button>
            </Link>
            <Link href='/login'>
              <Button variant='outline'>Login</Button>
            </Link>
          </div>
      <div className='flex flex-col py-12'>
          <Marquee3D />
        </div>
      </div>
    </div>
  );
}

function AnimatedShinyTextDemo() {
  return (
    <div className="text-xs z-10 flex items-center justify-center">
      <div
        className={cn(
          "text-xs group rounded-full border border-black/5 bg-neutral-100 text-white transition-all ease-in dark:border-white/5 dark:bg-neutral-900",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out">
          <span>🎉 Introducing TattooAI</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}
