"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData): Promise<void> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect("error", "/signup", "Email and password are required");
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (authError) {
    console.error(authError.code + " " + authError.message);
    return encodedRedirect("error", "/signup", authError.message);
  }

  // If signup is successful, create a user in the custom users table
  if (authData.user) {
    const now = new Date().toISOString();
    
    // Insert into users table
    const { error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: authData.user.email,
      username: authData.user.email, // Use email as username or add a separate username field
      created_at: now,
      updated_at: now,
    });

    if (userError) {
      console.error("Error creating user in custom table:", userError.message);
      // Handle the error (e.g., delete auth user or notify admin)
      return encodedRedirect("error", "/signup", "Error creating user account");
    }

    // Insert free tier subscription
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: authData.user.id,
        status: 'active',
        plan_id: 'free_tier',
        current_period_start: now,
        current_period_end: null, // Null for indefinite free tier
        created_at: now,
        updated_at: now,
      });

    if (subscriptionError) {
      console.error("Error creating free tier subscription:", subscriptionError.message);
      // Handle the error (e.g., delete user entry or notify admin)
      return encodedRedirect("error", "/signup", "Error setting up free tier");
    }
  }

  return encodedRedirect(
    "success",
    "/signup",
    "Thanks for signing up! Please check your email for a verification link.",
  );
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/signin", error.message);
  }

  return redirect("/profile");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
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
  const supabase = createClient();

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

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/signin");
};