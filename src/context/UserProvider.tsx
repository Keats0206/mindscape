// components/UserProvider.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CompleteUserData } from '../types';

interface UserContextType {
  userData: CompleteUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<CompleteUserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialData: CompleteUserData | null;
}

export function UserProvider({ children, initialData }: UserProviderProps) {
  const [userData, setUserData] = useState<CompleteUserData | null>(initialData);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}