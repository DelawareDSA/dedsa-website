import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // ✅ promise-based
): Promise<NextResponse> {
  const { slug } = await params; // await the params
  const filePath = path.join(
    process.cwd(),
    'public/newsletters',
    `${slug}.html`
  );

  try {
    const html = await fs.readFile(filePath, 'utf-8');
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function generateStaticParams() {
  try {
    const newslettersDir = path.join(process.cwd(), 'public/newsletters');
    const files = await fs.readdir(newslettersDir);

    return files
      .filter((file) => file.endsWith('.html'))
      .map((file) => ({
        slug: file.replace('.html', ''),
      }));
  } catch {
    // Return empty array if newsletters directory doesn't exist
    return [];
  }
}
