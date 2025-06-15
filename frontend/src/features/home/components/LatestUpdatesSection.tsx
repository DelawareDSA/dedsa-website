'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type N = {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  author?: { node?: { name: string } };
};

export default function LatestUpdatesSection() {
  const [ns, setNs] = useState<N[]>([]);
  const [l, setL] = useState(true);
  const [e, setE] = useState('');

  useEffect(() => {
    fetch('/api/newsletters')
      .then((r) =>
        r.ok ? r.json() : Promise.reject('Failed to fetch newsletters')
      )
      .then(setNs)
      .catch((x) => setE(String(x)))
      .finally(() => setL(false));
  }, []);

  if (l)
    return <div className="text-center py-10">Loading latest updates...</div>;
  if (e)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading updates: {e}
      </div>
    );

  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-heading">
            LATEST FROM THE DELAWARE ROSE GARDEN
          </h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded" />
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            News and updates from our chapter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ns.map((n) => (
            <article
              key={n.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-card-title group-hover:text-dsa-red transition-colors">
                  {n.title}
                </h3>
                <p className="text-muted text-sm mb-3 flex items-center">
                  {}
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(n.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {n.author?.node?.name && (
                    <>
                      <span className="mx-2">|</span>
                      {}
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {n.author.node.name}
                    </>
                  )}
                </p>
                <div className="text-card-body mb-4 line-clamp-3">
                  {n.excerpt}
                </div>
                <div>
                  <Link
                    href={`/newsletter/${n.slug}`}
                    className="inline-flex items-center text-link font-medium hover:underline group"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/newsletter"
            className="btn btn-primary shadow-lg hover:shadow-xl transform hover:translate-y-px transition px-8 py-3 text-lg"
          >
            READ ALL UPDATES
          </Link>
        </div>
      </div>
    </section>
  );
}
