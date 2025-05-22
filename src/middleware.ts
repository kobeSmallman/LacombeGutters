import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware handles redirects for paths that might be
// linked from search engines or old bookmarks
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Map of old/common paths to their correct routes
  const redirects: Record<string, string> = {
    '/About': '/about',
    '/ABOUT': '/about',
    '/about.html': '/about',
    '/Contact': '/contact',
    '/CONTACT': '/contact',
    '/contact.html': '/contact',
    '/Free-Estimate': '/#free-estimate',
    '/FREE-ESTIMATE': '/#free-estimate',
    '/free-estimate': '/#free-estimate',
    '/Free_Estimate': '/#free-estimate',
    '/Services': '/services',
    '/SERVICES': '/services',
    '/services.html': '/services',
    '/Gallery': '/gallery',
    '/GALLERY': '/gallery',
    '/gallery.html': '/gallery',
    '/Why-Us': '/why-us',
    '/WHY-US': '/why-us',
    '/why_us': '/why-us',
  };

  // Check if the current path needs to be redirected
  if (pathname in redirects) {
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Match paths that might need redirection
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
