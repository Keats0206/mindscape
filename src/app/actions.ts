"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { track } from '@vercel/analytics/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function signUpAction(formData: FormData): Promise<void> {
  track('Signup');
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect("error", "/signup", "Email and password are required");
  }


  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?redirect_to=/profile`,
      data: { email },
    },
  });

  if (authError) {
    console.error(authError.code + " " + authError.message);
    return encodedRedirect("error", "/signup", authError.message);
  }

  // If signup is successful, create a user in the custom users table
  if (authData.user) {
    const now = new Date().toISOString();
    
    try {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: authData.user.email,
        metadata: { user_id: authData.user.id }
      });

      // Insert into users table
      const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        username: authData.user.email,
        stripe_customer_id: customer.id, // Store Stripe customer ID
        created_at: now,
        updated_at: now,
        subscription_status: 'trialing',
      });

      if (userError) {
        throw new Error("Error creating user in custom table: " + userError.message);
      }

      // Insert free tier subscription
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: authData.user.id,
          status: 'inactice',
          plan_id: 'trialing',
          current_period_start: now,
          current_period_end: null, // Null for indefinite free tier
          stripe_customer_id: customer.id, // Store Stripe customer ID
          created_at: now,
          updated_at: now,
        });

      if (subscriptionError) {
        throw new Error("Error creating free tier subscription: " + subscriptionError.message);
      }
    } catch (error) {
      console.error("Error in user creation process:", error);
      // TODO: Implement rollback logic here (delete auth user, Stripe customer, etc.)
      return encodedRedirect("error", "/signup", "Error creating user account");
    }
  }

  return encodedRedirect(
    "success",
    "/signup",
    "Thanks for signing up! Please check your email for a verification link.",
  );
}

export const signInAction = async (formData: FormData) => {
  track('Signin');
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
  });

  if (error) {
      return encodedRedirect("error", "/login", error.message);
  }
  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  track('Forgot password');
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  track('Reset password');
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export async function signOutAction(): Promise<void> {
  track('Signout');
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error("Sign out error:", error.message);
      return encodedRedirect("error", "/login", "Error signing out");
    }
    
    // Redirect to the login page after successful sign out
    return encodedRedirect("success", "/login", "Successfully signed out");
  } catch (error) {
    console.error("Unexpected error during sign out:", error);
    return encodedRedirect("error", "/login", "Unexpected error signing out");
  }
}