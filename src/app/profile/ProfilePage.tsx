// components/ProfileComponent.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton';
import { CompleteUserData } from '@/types';

function ProfileComponent({ userData }: { userData: CompleteUserData }) {
  const userDetails = userData?.userDetails;
  const initial = userDetails?.full_name ? userDetails.full_name[0].toUpperCase() : userDetails.email[0].toUpperCase();
  const isProUser = userDetails?.subscription_status === 'active';
  const didCancel = userData?.subscription?.cancel_at_period_end === true;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="h-screen space-y-4 max-w-[400px] flex flex-col items-center pt-48">
        {userDetails.profile_picture_url ? (
          <Image
            src={userDetails.profile_picture_url} 
            alt="Profile Picture" 
            className="w-12 h-12 rounded-full mx-auto"
            width={48}
            height={48}
            placeholder="blur"
            blurDataURL={userDetails.profile_picture_url}
          />
        ) : (
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500">
            {initial}
          </div>
        )}
        <h2 className="font-semibold text-center">{userDetails.full_name || userDetails.email}</h2>
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