import { getCurrentUser } from '@/utils/user';
import HomeComponent from '@/components/HomeComponent';
import { LandingPage } from '@/components/LandingPage';

export default async function HomePage() {
  const userData = await getCurrentUser();

  return (
    <div>
      {userData ? (
        <HomeComponent />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

