"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Subscription Successful!</h1>
      <p className="text-xl mb-4">Thank you for subscribing to our service.</p>
      <Button
        onClick={() => router.push('/')}
      >
        Start Creating
      </Button>
    </div>
  );
}