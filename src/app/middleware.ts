import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // Allow access only from localhost (127.0.0.1 or localhost:3000)
  if (host !== "localhost:3000" && !host?.startsWith("127.0.0.1")) {  
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home
  }

  // If the host is localhost, proceed with authentication check
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const { data: { user } } = await supabase.auth.getUser();

  // If user is not authenticated and trying to access a protected route, redirect to login
  if (!user && request.nextUrl.pathname === "/pricing") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/create"], // Apply middleware only to /create route
};