import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware handles redirects for paths that might be
// linked from search engines or old bookmarks
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Map of old/common paths to their correct routes
  const redirects: Record<string, string> = {
    // Standard variations
    '/About': '/about',
    '/ABOUT': '/about',
    '/about.html': '/about',
    '/Contact': '/contact',
    '/CONTACT': '/contact',
    '/contact.html': '/contact',
    '/Free-Estimate': '/contact',
    '/FREE-ESTIMATE': '/contact',
    '/free-estimate': '/contact',
    '/Free_Estimate': '/contact',
    '/%23free-estimate': '/contact', // Handle URL-encoded # character
    '/Services': '/services',
    '/SERVICES': '/services',
    '/services.html': '/services',
    '/Gallery': '/gallery',
    '/GALLERY': '/gallery',
    '/gallery.html': '/gallery',
    '/Why-Us': '/why-us',
    '/WHY-US': '/why-us',
    '/why_us': '/why-us',
    
    // Specific old Wix paths found in search results
    '/page4': '/about',
    '/book-online/plumbing': '/contact',
    '/form__map': '/contact',
    '/book-online': '/contact',
    
    // Handle potential URL variations of service pages that don't exist
    '/services/carpentry': '/services',
    '/services/remodeling': '/services',
    '/services/electrical': '/services',
  };

  // Check if the current path needs to be redirected
  if (pathname in redirects) {
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url);
  }

  // Handle nested paths like /book-online/plumbing
  for (const [oldPath, newPath] of Object.entries(redirects)) {
    if (pathname.startsWith(oldPath + '/')) {
      url.pathname = newPath;
      return NextResponse.redirect(url);
    }
  }

  // Note: /service-page/ redirects are handled in next.config.ts to avoid conflicts

  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Match paths that might need redirection
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
