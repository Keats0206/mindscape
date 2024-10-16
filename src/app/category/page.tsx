// app/explore/page.tsx
import { Suspense } from 'react';
import Category from './Category';
import SignUpCTA from '@/components/ui/SignUpCTA';
export default function ExplorePage({ searchParams }: { searchParams: { category?: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Category initialCategory={searchParams.category} />
      <SignUpCTA />
    </Suspense>
  );
}