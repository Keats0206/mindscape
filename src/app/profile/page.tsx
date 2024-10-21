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
    <div className="flex flex-col pt-24">
      <div className="bg-white space-y-4 w-64">
        {userData.profile_picture_url ? (
          <img 
            src={userData.profile_picture_url} 
            alt="Profile Picture" 
            className="w-24 h-24 rounded-full mx-auto"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500">
            {initial}
          </div>
        )}
        <h2 className="text-xl font-semibold text-center">{userData.full_name || userData.email}</h2>
        <p className="text-center text-gray-600">
          {isFreeUser ? 'Free Tier' : `${userData.subscription?.plan_id} Tier`}
        </p>
        {isFreeUser && (
          <Link href="/pricing" className="block w-full">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Upgrade
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;