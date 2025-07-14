import nationalInfoData from '@/core/content/pages/about.json';
import { NationalInfoContent } from '@/core/types/pages/about';

const typedContent = nationalInfoData.nationalInfo as NationalInfoContent;

export default function NationalInfo() {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6">{typedContent.title}</h2>
      <div className="prose prose-lg">
        <p>{typedContent.description}</p>
        <div className="mt-6">
          <a
            href={typedContent.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-dsa-red hover:underline"
          >
            {typedContent.linkText}
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
