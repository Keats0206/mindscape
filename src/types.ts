import { User } from "@supabase/supabase-js";

export interface Subscription {
  id: bigint;
  user_id: string;
  status: string;
  plan_id: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
}

export interface UserDetails {
  id: string;
  username: string;
  email: string;
  full_name: string;
  bio: string;
  profile_picture_url: string;
  created_at: string;
  updated_at: string;
  stripe_customer_id: string;
  subscription_status: string;
  active_subscription_id: string | null;
}

export interface CompleteUserData extends Omit<UserDetails, 'id' | 'email' | 'created_at' | 'updated_at'>, Omit<User, 'id' | 'email' | 'created_at' | 'updated_at'> {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  subscription: Subscription | null;
}

export interface Generation {
  id: string;
  user_id: string;
  type: 'image' | 'video';
  prompt: string;
  result_url: string;
  model_used: string;
  is_public: boolean;
  created_at: string;
  tags: string[];
}

export interface CategoryProps {
  initialCategory?: string;
}

export function createCompleteUserData(
  userDetails: UserDetails, 
  subscription: Subscription | null, 
  supabaseUser: User
): CompleteUserData {
  return {
    ...userDetails,
    ...supabaseUser,
    subscription,
  };
}

export interface Post {
  id: string;
  result_url: string;
  prompt: string;
}

export interface Category {
  name: string;
  posts: Post[];
}