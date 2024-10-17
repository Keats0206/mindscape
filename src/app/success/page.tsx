"use client";

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Subscription Successful!</h1>
      <p className="text-xl mb-4">Thank you for subscribing to our service.</p>
      <button
        onClick={() => router.push('/dashboard')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
}