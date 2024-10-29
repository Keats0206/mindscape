import { getCurrentUser } from '@/utils/user';
import ProfileComponent from './ProfilePage';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  return <ProfileComponent userData={userData} />;
}