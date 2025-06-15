import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const rateLimit = {
  windowMs: 60 * 1000, 
  max: 60, 
};

const cache = new Map();

export function middleware(request: NextRequest) {
  
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const windowStart = now - rateLimit.windowMs;

  const requestTimestamps = cache.get(ip) || [];
  const recentRequests = requestTimestamps.filter(
    (timestamp: number) => timestamp > windowStart
  );

  if (recentRequests.length >= rateLimit.max) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Please try again later',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': rateLimit.max.toString(),
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        },
      }
    );
  }

  recentRequests.push(now);
  cache.set(ip, recentRequests);

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', rateLimit.max.toString());
  response.headers.set(
    'X-RateLimit-Remaining',
    (rateLimit.max - recentRequests.length).toString()
  );

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
