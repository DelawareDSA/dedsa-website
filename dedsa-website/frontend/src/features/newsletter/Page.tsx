'use client';

import type { NewsletterPageContent } from '@/core/types/pages/newsletter';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Newsletter {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  htmlPath?: string;
}

export default function NewsletterPage(props: NewsletterPageContent) {
  const { title, noPostsMessage, errorTitle, errorMessage, errorActionLabel } =
    props;
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/newsletters')
      .then((res) => res.json())
      .then((data) => {
        setNewsletters(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dsa-red-t4 py-12">
        <div className="container-page">
          <div className="text-center">Loading newsletters...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dsa-red-t4 py-12">
        <div className="container-page">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{errorTitle}</h1>
            <p className="mb-4">{errorMessage}</p>
            <Link href="/" className="btn btn-primary">
              {errorActionLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page py-12">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>

        {newsletters.length === 0 ? (
          <p className="text-center text-dsa-black">{noPostsMessage}</p>
        ) : (
          <div className="grid gap-6">
            {newsletters.map((newsletter) => (
              <article
                key={newsletter.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    href={
                      newsletter.htmlPath || `/newsletter/${newsletter.slug}`
                    }
                    target={newsletter.htmlPath ? '_blank' : undefined}
                    className="hover:text-dsa-red"
                  >
                    {newsletter.title}
                    {newsletter.htmlPath && (
                      <span className="ml-2 text-sm text-dsa-black">
                        (View HTML)
                      </span>
                    )}
                  </Link>
                </h2>
                <p className="text-dsa-black mb-4">
                  {new Date(newsletter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-dsa-black">{newsletter.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
