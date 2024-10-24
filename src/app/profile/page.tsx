// components/ProfileComponent.tsx
'use client';

import React from 'react';
import { useUser } from '@/context/UserProvider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton';
const ProfileComponent = () => {
  const { userData } = useUser();

  if (!userData) return <div className="flex items-center justify-center h-screen">
     <LoadingSpinner />
  </div>;

  const initial = userData.full_name ? userData.full_name[0].toUpperCase() : userData.email[0].toUpperCase();
  const isProUser = userData.subscription_status === 'active';
  const didCancel = userData.subscription?.cancel_at_period_end === true;

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
          {!isProUser ? 'Free Tier' : `Pro Plan`}
        </p>
        {!isProUser ? (
          <Link href="/pricing">
            <Button>
              Upgrade
            </Button>
          </Link>
        ) : (
          <ManageSubscriptionButton />
        )}
        {didCancel && isProUser && (
          <div className="text-xs text-center text-red-600">
            Your subscription has been canceled and will end after the current billing period.
          </div>
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