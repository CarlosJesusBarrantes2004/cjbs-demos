import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /cafe/admin routes
  if (path.startsWith('/cafe/admin')) {
    // Allow access to login page
    if (path === '/cafe/admin/login') {
      return NextResponse.next();
    }

    // Check for session cookie
    const session = request.cookies.get('admin_session')?.value;
    
    // Very simple token check
    if (!session || session !== 'authenticated') {
      return NextResponse.redirect(new URL('/cafe/admin/login', request.url));
    }
  }

  // Protect API routes under /api/cafe/admin as well
  if (path.startsWith('/api/cafe/admin') && path !== '/api/cafe/admin/login') {
      
    // Allow GET /api/cafe/admin/menu to be public so the cafe page can read it
    if (path === '/api/cafe/admin/menu' && request.method === 'GET') {
        return NextResponse.next();
    }

    const session = request.cookies.get('admin_session')?.value;
    if (!session || session !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cafe/admin/:path*', '/api/cafe/admin/:path*'],
};
