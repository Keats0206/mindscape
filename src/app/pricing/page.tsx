import { getCurrentUser } from '@/utils/user';
import PricingComponent from './PricingComponent';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  return <PricingComponent userData={userData} />;
}