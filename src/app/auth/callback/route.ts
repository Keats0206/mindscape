import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  try {
    const requestUrl = new URL(request.url);
    const error = requestUrl.searchParams.get("error");
    const errorDescription = requestUrl.searchParams.get("error_description");
    const origin = requestUrl.origin;

    // Handle incoming errors first
    if (error) {
      console.error("Auth error:", error, errorDescription);
      return NextResponse.redirect(
        `${origin}/login?error=${error}&description=${encodeURIComponent(errorDescription || '')}`
      );
    }

    const code = requestUrl.searchParams.get("code");
    const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Session exchange error:", exchangeError.message);
      return NextResponse.redirect(`${origin}/login?error=exchange_error`);
    }

    // Rest of your code...
    const response = NextResponse.redirect(
      redirectTo ? `${origin}${redirectTo}` : `${origin}/profile`
    );

    response.cookies.set({
      name: 'sb-auth-token',
      value: data.session?.access_token || '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return response;

  } catch (err) {
    console.error("Error in auth callback:", err);
    // Get origin from request if available, otherwise fallback to a default
    const fallbackOrigin = request.url ? new URL(request.url).origin : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${fallbackOrigin}/login?error=unknown`);
  }
}