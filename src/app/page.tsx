import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Lens } from '@/components/magicui/lens';
import { GenAppsMarquee } from '@/components/GenAppsMarquee';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { FAQSection } from '@/components/FAQSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function SectionHeader({title, description, textAlign}: {title: string, description: string, textAlign: string}  ) {
  return (
    <div className={`flex flex-col space-y-2 ${textAlign}`}>
      <div className='text-2xl'>{title}</div>
      <div className='text-lg text-gray-500'>{description}</div>
    </div>  )
}

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    redirect('/create');
  }
  
  return (
    <main className='flex flex-col w-screen'>
      
      {/* Header */}
      <div className='h-16 flex flex-row items-center justify-between px-8 border-b border-gray-200'>
        <div className='text-2xl font-bold'>Logo</div>
        <div className='flex flex-row space-x-4'>
          <Link href='/login'>
            <Button variant='outline'>Login</Button>
          </Link>
          <Link href='/signup'>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>

      {/* Intro */}
      <div className='p-24 flex flex-col space-y-8 items-center justify-center'>
        <div className='text-6xl font-bold text-center'>Create Anything</div>
        <div className='text-xl text-center'>AI Image generation and editing tools for every use case</div>
      </div>
      
      {/* Customzied models for every use case */}
      <div className="w-full py-24 px-8 flex flex-col items-center justify-center space-y-8">
        <SectionHeader title="Access community created models" description="Whether you're a professional artist or a hobbyist, we've got you covered." textAlign='text-center' />
        <GenAppsMarquee />
      </div>

      {/* Unbelievable output quality */}

      {/* <div className='flex flex-row py-24 px-8 bg-stone-100 flex flex-col items-center justify-center space-y-4'>
        <SectionHeader title="Unbelievable output quality" description="Whether you're a professional artist or a hobbyist, we've got you covered." textAlign='text-start' />
        <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image placeholder"
            width={500}
            height={500}
          />
        </Lens>
      </div> */}
    </main>
  );
}

