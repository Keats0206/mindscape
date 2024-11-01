// GenerationResults.tsx
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from "next/image";

interface GenerationResultsProps {
  items: Array<{text: string, image: string}>;
  error: string | null;
}

export function GenerationResults({ items, error }: GenerationResultsProps) {
  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="p-4 overflow-y-scroll w-full h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {items.map(({ text, image }, index) => (
          <div key={index} className="text-center flex flex-col items-center w-full h-full">
            <Image
              src={image}
              alt={text}
              width={512}
              height={512}
              unoptimized
              className="rounded shadow-lg"
              placeholder="blur"
              blurDataURL={image}
            />
            <p className="mt-2 text-sm text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}