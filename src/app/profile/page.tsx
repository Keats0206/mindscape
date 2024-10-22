// components/ProfileComponent.tsx
'use client';

import React from 'react';
import { useUser } from '@/context/UserProvider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

const ProfileComponent = () => {
  const { userData } = useUser();

  if (!userData) return <div className="flex items-center justify-center h-screen">
     <LoadingSpinner />
  </div>;

  const initial = userData.full_name ? userData.full_name[0].toUpperCase() : userData.email[0].toUpperCase();
  const isFreeUser = !userData.subscription || userData.subscription.plan_id === 'free_tier';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="h-screen space-y-4 max-w-[400px] flex flex-col items-center pt-48">
        {userData.profile_picture_url ? (
          <img 
            src={userData.profile_picture_url} 
            alt="Profile Picture" 
            className="w-12 h-12 rounded-full mx-auto"
          />
        ) : (
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500">
            {initial}
          </div>
        )}
        <h2 className="font-semibold text-center">{userData.full_name || userData.email}</h2>
        <p className="text-center text-gray-600">
          {isFreeUser ? 'Free Tier' : `Pro Plan`}
        </p>
        {isFreeUser ? (
          <Link href="/pricing">
            <Button>
              Upgrade
            </Button>
          </Link>
        ) : (
          <Link href="/profile">
            <Button>
              Manage Subscription
            </Button>
          </Link>
        )}
        <div className='pt-24 flex flex-row items-center gap-2'>
          <div className='text-sm text-gray-500 hover:underline'>Terms of Service</div>
          <div className='text-sm text-gray-500 hover:underline'>Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;