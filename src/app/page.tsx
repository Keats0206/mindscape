
import { getCurrentUser } from '@/utils/user';
import { WelcomeState } from '@/components/WelcomeState';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const userData = await getCurrentUser();

  return (
    <div>
      {userData ? (
        <HomeClient initialUserData={userData} />
      ) : (
        <div className='h-screen w-screen flex items-center justify-center'>
          <WelcomeState />
        </div>
      )}
    </div>
  );
}

