import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;
    const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=auth_error`);
    }

    // Set cookie with the session
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
    console.error("Callback error:", err);
    // Get origin from request if available, otherwise fallback to a default
    const fallbackOrigin = request.url ? new URL(request.url).origin : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${fallbackOrigin}/login?error=unknown`);
  }
}