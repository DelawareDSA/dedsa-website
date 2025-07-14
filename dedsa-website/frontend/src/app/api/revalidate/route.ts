import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!REVALIDATE_SECRET) {
      console.error('REVALIDATE_SECRET environment variable is not set');
      return NextResponse.json(
        { error: 'Server misconfiguration - revalidation unavailable' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { path, tag, secret } = body as {
      path?: string;
      tag?: string;
      secret?: string;
    };

    if (!secret) {
      return NextResponse.json(
        { error: 'Missing secret parameter' },
        { status: 400 }
      );
    }

    if (secret !== REVALIDATE_SECRET) {
      console.warn('Invalid revalidation secret attempt');
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    if (!path && !tag) {
      return NextResponse.json(
        { error: 'Either "path" or "tag" must be provided' },
        { status: 400 }
      );
    }

    if (path) {
      try {
        revalidatePath(path);
        return NextResponse.json({
          revalidated: true,
          path,
          message: `Path "${path}" revalidated successfully`,
        });
      } catch (err) {
        console.error('Error revalidating path:', err);
        return NextResponse.json(
          { error: 'Failed to revalidate path' },
          { status: 500 }
        );
      }
    }

    if (tag) {
      try {
        revalidateTag(tag);
        return NextResponse.json({
          revalidated: true,
          tag,
          message: `Tag "${tag}" revalidated successfully`,
        });
      } catch (err) {
        console.error('Error revalidating tag:', err);
        return NextResponse.json(
          { error: 'Failed to revalidate tag' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Revalidation request could not be processed' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Unexpected revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error during revalidation' },
      { status: 500 }
    );
  }
}
