import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // Allow access only from localhost (127.0.0.1 or localhost:3000)
  if (host !== "localhost:3000" && !host?.startsWith("127.0.0.1")) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home
  }

  // If the host is localhost, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/create"], // Apply middleware only to /dashboard route
};