"use client"

import React, { useState } from 'react';
import getStripe from '@/utils/stripe/stripe';
import { Button } from '@/components/ui/button';
import { CompleteUserData } from '@/types';

export default function SubscribeButton({ userData }: { userData: CompleteUserData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user_id = userData?.userDetails.id;

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error('Failed to load Stripe');
      }
    } catch (error) {
      console.error('Error in subscribe process:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleSubscribe}
        disabled={isLoading}
        className='w-full'
      >
        {isLoading ? 'Opening...' : 'Upgrade'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};