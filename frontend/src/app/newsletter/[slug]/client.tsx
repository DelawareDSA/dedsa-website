'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Newsletter {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
}

interface NewsletterPageClientProps {
  newsletter: Newsletter;
  publishDate: Date;
  otherNewsletters: Newsletter[];
}

export default function NewsletterPageClient({
  newsletter,
  publishDate,
  otherNewsletters,
}: NewsletterPageClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShare = () => {
    if (isClient && navigator.share) {
      navigator
        .share({
          title: newsletter.title,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const handleEmailShare = () => {
    if (isClient) {
      const subject = encodeURIComponent(newsletter.title);
      const body = encodeURIComponent(
        `Check out this newsletter from Delaware DSA: ${window.location.href}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  const handlePrint = () => {
    if (isClient) {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-dsa-black">
              <li>
                <Link href="/" className="hover:text-dsa-red">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/newsletter" className="hover:text-dsa-red">
                  Newsletter
                </Link>
              </li>
              <li>/</li>
              <li className="text-dsa-black">{newsletter.title}</li>
            </ol>
          </nav>

          {}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  {newsletter.featured && (
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-dsa-red text-white mb-4">
                      Featured
                    </span>
                  )}
                  <h1 className="text-4xl font-bold text-dsa-black mb-2">
                    {newsletter.title}
                  </h1>
                  <div className="flex items-center gap-4 text-dsa-black mb-4">
                    <span>By {newsletter.author}</span>
                    <span>•</span>
                    <time dateTime={newsletter.date}>
                      {publishDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="text-xl text-dsa-black">{newsletter.excerpt}</p>
                </div>
              </div>

              {}
              {newsletter.tags && newsletter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {newsletter.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dsa-red-t4 text-dsa-black rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {}
              <div className="flex gap-4 pt-6 border-t">
                {isClient && 'share' in navigator && (
                  <button onClick={handleShare} className="btn btn-outline">
                    Share Newsletter
                  </button>
                )}
                <button onClick={handleEmailShare} className="btn btn-outline">
                  Email This
                </button>
                <button onClick={handlePrint} className="btn btn-outline">
                  Print
                </button>
              </div>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: newsletter.content }}
              />
            </div>
          </div>

          {}
          <div className="bg-dsa-red text-white rounded-lg p-8 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="text-xl mb-6">
                Ready to join the fight for democratic socialism in Delaware?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/join"
                  className="btn bg-white text-dsa-red hover:bg-dsa-red-t4"
                >
                  Join Delaware DSA
                </Link>
                <Link
                  href="/contact"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-dsa-red"
                >
                  Volunteer
                </Link>
                <Link
                  href="/contact"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-dsa-red"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-dsa-black mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-dsa-black mb-6">
              Stay up-to-date with Delaware DSA news, events, and organizing
              updates.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dsa-red focus:border-transparent"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>

          {}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-dsa-black mb-6">
              Other Newsletters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherNewsletters.slice(0, 4).map((otherNewsletter) => {
                const otherDate = new Date(otherNewsletter.date);
                return (
                  <Link
                    key={otherNewsletter.id}
                    href={`/newsletter/${otherNewsletter.id}`}
                    className="block p-6 border rounded-lg hover:border-dsa-red transition-colors"
                  >
                    {otherNewsletter.featured && (
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-dsa-red text-white mb-2">
                        Featured
                      </span>
                    )}
                    <h4 className="font-semibold text-dsa-black mb-2">
                      {otherNewsletter.title}
                    </h4>
                    <p className="text-sm text-dsa-black mb-2">
                      {otherDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-dsa-black">
                      {otherNewsletter.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Link href="/newsletter" className="btn btn-secondary">
                View All Newsletters
              </Link>
            </div>
          </div>

          {}
          <div className="mt-8 flex justify-between">
            <Link href="/newsletter" className="btn btn-secondary">
              ← Back to Newsletter
            </Link>
            <a
              href={`mailto:communications@delawardsa.org?subject=Feedback on ${newsletter.title}`}
              className="btn btn-outline"
            >
              Send Feedback
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
