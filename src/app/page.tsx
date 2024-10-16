import ImageCloud from '@/components/ui/image-cloud';
import HyperText from '@/components/ui/hyper-text';

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
    <main className='w-screen'>
      <ImageCloud images={images}></ImageCloud>
      <div className='flex flex-col items-center justify-center w-screen h-screen absolute top-0 left-0'>
         <HyperText 
          className='text-2xl text-center'
          text="Generate infinite"
         />
         <HyperText className='text-2xl text-center'
          text="visual inspiration"
         />
      </div>
    </main>
  )
}