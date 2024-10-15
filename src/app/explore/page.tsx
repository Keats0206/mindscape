// app/explore/page.tsx
import { Suspense } from 'react';
import ExploreCategory from './ExploreCategory';

export default function ExplorePage({ searchParams }: { searchParams: { category?: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreCategory initialCategory={searchParams.category} />
    </Suspense>
  );
}