import { getCurrentUser } from '@/utils/user';
import CreateComponent from './CreateComponent';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  return <CreateComponent initialUserData={userData} />;
}