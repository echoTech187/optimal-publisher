
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateOrRefreshToken } from '@/lib/actions/auth';

// This function is the middleware
export async function middleware(request: NextRequest) {
  // Call the validation function to check the token
  const isValid = await validateOrRefreshToken();

  // If the token is not valid, redirect to the sign-in page
  if (!isValid) {
    // Construct the sign-in URL, preserving any query parameters if needed
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If the token is valid, allow the request to proceed
  return NextResponse.next();
}

// This config specifies which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     * - / (the homepage)
     */
    // '/optimal/:path*',
    // '/program/:path*',
    // '/pack/:path*',
  ],
};
