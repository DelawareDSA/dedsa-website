// src/app/api/events/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('/api/events invoked');

  // 1. Ensure we have our WP base URL
  const wpUrl = process.env.WORDPRESS_API_URL;
  if (!wpUrl) {
    console.error('Missing WORDPRESS_API_URL');
    return NextResponse.json(
      { error: 'Missing WORDPRESS_API_URL' },
      { status: 500 }
    );
  }

  try {
    // 2. Parse month/year from query string (or default to now)
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') ?? String(new Date().getMonth() + 1);
    const year  = searchParams.get('year')  ?? String(new Date().getFullYear());

    // 3. Strip any trailing `/graphql` from the base
    const base = wpUrl.replace(/\/graphql$/, '');

    // 4. Build our REST endpoint URL
    const endpoint = `${base}/wp-json/calendar/v1/events?month=${month}&year=${year}`;
    console.log('Fetching events from', endpoint);

    // 5. Proxy the request
    const res = await fetch(endpoint);
    if (!res.ok) {
      console.error('WP fetch failed', res.status);
      return NextResponse.json(
        { error: 'WP fetch failed' },
        { status: res.status }
      );
    }

    // 6. Return the combined payload (`{ wp: [...], google: [...] }`)
    const data = await res.json();
    console.log('Retrieved', data.wp?.length ?? 0, 'WP events and', data.google?.length ?? 0, 'Google events');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Calendar API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
