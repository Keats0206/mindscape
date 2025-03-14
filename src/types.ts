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


export interface CompleteUserData {
  userDetails: UserDetails;
  subscription: Subscription;
}

export function createCompleteUserData(
  userDetails: UserDetails, 
  subscription: Subscription
): CompleteUserData {
  return {
    userDetails: userDetails,
    subscription: subscription
  };
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

export interface Post {
  id: string;
  result_url: string;
  prompt: string;
}

export interface Category {
  name: string;
  description: string;
  slug: string;
  tags: string[];
  posts?: Post[];
}
export interface Model {
  id: number;
  image: string;
  name: string;
  value: string;
  description: string;
}
export interface PromptLine {
  id: string;
  text: string;
  placeholder: string;
  options?: string[];
}

export interface PromptFormDetail {
  id: string;
  name: string;
  description: string;
  promptLines: PromptLine[];
}

export interface GenApp {
  id: string;
  name: string;
  creatorID: string;
  creatorUsername: string;
  coverImage: string;
  description: string;
  model: Model;
  promptForm: PromptFormDetail;
}