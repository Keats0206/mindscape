import ImageCloud from '@/components/ui/image-cloud';
import { Titillium_Web } from 'next/font/google';
import WordRotate from '@/components/ui/word-rotate';

const titilliumWeb = Titillium_Web({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-dm-serif-display',
});

export default function Home() {

  const images = [
    {
      src: "generation_1.png",
      alt: "Generation 1",
      link: "https://genspo.com/generation1",
      width: 100,
      height: 100,
    },
    {
      src:  "generation_2.png",
      alt: "Generation 2",
      link: "https://genspo.com/generation2",
      width: 100,
      height: 100,
    },
    {
      src: "generation_3.png",
      alt: "Generation 3",
      link: "https://genspo.com/generation3",
      width: 100,
      height: 100,
    },
    {
      src: "generation_4.png",
      alt: "Generation 4",
      link: "https://genspo.com/generation4",
      width: 100,
      height: 100,
    },
    {
      src: "generation_5.png",
      alt: "Generation 5",
      link: "https://genspo.com/generation5",
      width: 100,
      height: 100,
    },
    {
      src: "generation_6.png",
      alt: "Generation 6",
      link: "https://genspo.com/generation6",
      width: 100,
      height: 100,
    },
    
  ]
  return (
    <main className='w-screen h-screen pt-16'>
      <div className='h-full w-full'>
        <ImageCloud images={images}></ImageCloud>
      </div>
      <div className={titilliumWeb.variable}>
        <div className='text-center text-4xl sm:text-5xl md:text-6xl -z-10 flex flex-col items-center justify-center w-screen h-screen absolute top-0 left-0'>
          <div 
            className={titilliumWeb.variable}
          >
            Generate your next
            </div>
          <div>
            <WordRotate 
              className={titilliumWeb.variable}
              words={["outfit idea", "interior design", "nail polish palette", "wedding inspiration"]}
            />
          </div>
        </div>
      </div>
    </main>
  )
}