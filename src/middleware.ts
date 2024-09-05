import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/dashboard') && !token) {
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/sign-in') && token) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sign-in',
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
