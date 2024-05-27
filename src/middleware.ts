import { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './navigation';

const privateRoutes = [
  '/user',
  '/categories',
  '/login/confirm',
  '/videos/.*',
  '/videos',
  '/application/.*',
  '/payment/.*',
  '/notifications'
];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en'
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/login'
    }
  }
);

export default function middleware(req: NextRequest) {
  // Create a regular expression to match non-private routes
  const privatePathnameRegex = new RegExp(
    `^(/(${locales.join('|')}))?(${privateRoutes
      .map(route => route.replace(/\*/g, '.*'))
      .join('|')})$`,
    'i'
  );
  
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  if (isPrivatePage) {
    // If the path is in the private matcher, require authentication
    return (authMiddleware as any)(req);
  } else {
    // If the path is not in the private matcher, treat it as a public page
    return intlMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
