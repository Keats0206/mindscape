import { getCurrentUser } from '@/utils/user';
import HomeClient from '@/components/HomeClient';
import { LandingPage } from '@/components/LandingPage';

export default async function HomePage() {
  const userData = await getCurrentUser();

  return (
    <div>
      {userData ? (
        <HomeClient initialUserData={userData} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

