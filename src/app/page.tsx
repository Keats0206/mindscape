import { getCurrentUser } from '@/utils/user';
import HomeComponent from '@/components/HomeComponent';

export default async function HomePage() {
  const userData = await getCurrentUser();

  return (
    <div>
      <HomeComponent userData={userData} />
    </div>
  );
} 

