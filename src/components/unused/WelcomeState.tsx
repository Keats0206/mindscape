import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WordRotate } from '@/components/ui/word-rotate';
import { ImageCloud } from '@/components/ui/image-cloud';
import { sampleImages } from '@/data/sampleImages';

export function WelcomeState() {
  const words = ["outfit ideas", "interior design concept", "home decor inspo", "style inspiration"];
  
  return (
    <div className="relative w-full h-full">
      <div className="z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="text-5xl font-medium text-center">Generate infinite</div>
        <WordRotate 
          className="text-5xl font-medium text-center" 
          words={words}
        />
        <div className="flex flex-row gap-4 pt-4">
          <Link href="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className="-z-10 flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full opacity-50">
        <ImageCloud images={sampleImages} />
      </div>
    </div>
  );
}