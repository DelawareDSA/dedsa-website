import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public/newsletters');
    const files = await fs.readdir(dir);

    const newsletters = await Promise.all(
      files
        .filter((f) => f.endsWith('.html'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.html$/, '');
          const filePath = path.join(dir, fileName);
          const html = await fs.readFile(filePath, 'utf-8');

          const dom = new JSDOM(html);
          const doc = dom.window.document;

          let date = new Date().toISOString();
          let formattedTitle = `Rose Garden: ${slug}`;

          const timeEl = doc.querySelector('time[datetime]');
          if (timeEl) {
            date = timeEl.getAttribute('datetime')!;
          } else {
            const htmlText = html;

            const datePatterns = [
              /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/g,
              /\d{4}-\d{2}-\d{2}/g,
              /\d{1,2}\/\d{1,2}\/\d{4}/g,
            ];

            for (const pattern of datePatterns) {
              const matches = htmlText.match(pattern);
              if (matches && matches.length > 0) {
                try {
                  const parsedDate = new Date(matches[0]);
                  if (!isNaN(parsedDate.getTime())) {
                    date = parsedDate.toISOString();
                    break;
                  }
                } catch (e) {}
              }
            }
          }

          const dateObj = new Date(date);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          formattedTitle = `Rose Garden: ${year}-${month}-${day}`;

          const firstP = doc.querySelector('p');
          const excerpt = firstP ? firstP.textContent!.slice(0, 200) + '…' : '';

          return {
            id: slug,
            title: formattedTitle,
            date,
            slug,
            excerpt,
            htmlPath: `/newsletters/${fileName}`,
          };
        })
    );

    newsletters.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to load newsletters' },
      { status: 500 }
    );
  }
}
