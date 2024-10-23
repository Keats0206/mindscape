// FreeUserState.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WordRotate } from '@/components/ui/word-rotate';
import { ImageCloud } from '@/components/ui/image-cloud';
import { sampleImages } from '@/data/sampleImages';

export function FreeUserState() {
  const words = ["outfit ideas", "interior design concept", "home decor", "style inspiration"];
  
  return (
    <div className="relative w-full h-full">
      <div className="z-10 w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="text-4xl font-medium text-center">Ready to start creating?</div>
        <WordRotate 
          className="text-4xl font-medium" 
          words={words}
        />
        <div className="flex flex-row gap-4">
          <Link href="/pricing">
            <Button>Upgrade to Generate</Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline">Browse Community Creations</Button>
          </Link>
        </div>
      </div>
      <div className="-z-10 flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full">
        <ImageCloud images={sampleImages} />
      </div>
    </div>
  );
}