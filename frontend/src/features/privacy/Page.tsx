'use client';

import { Clock, ExternalLink, Lock, Mail, Shield, Users } from 'lucide-react';

interface PrivacySection {
  id: string;
  title: string;
  content: string;
  items?: string[];
  subsections?: {
    title: string;
    content: string;
    items?: string[];
  }[];
  contact?: {
    email: string;
    website: string;
  };
  services?: {
    name: string;
    purpose: string;
    privacy_policy: string;
  }[];
  contact_methods?: {
    method: string;
    value: string;
  }[];
  contact_info?: string;
}

interface PrivacyData {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
  legalNotice: string;
}

interface PrivacyPageProps {
  data: PrivacyData;
}

export default function PrivacyPage({ data }: PrivacyPageProps) {
  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'security':
        return <Shield className="w-6 h-6 text-dsa-red" />;
      case 'data-retention':
        return <Clock className="w-6 h-6 text-dsa-red" />;
      case 'data-sharing':
        return <Users className="w-6 h-6 text-dsa-red" />;
      case 'your-rights':
        return <Lock className="w-6 h-6 text-dsa-red" />;
      default:
        return <Shield className="w-6 h-6 text-dsa-red" />;
    }
  };

  const renderContent = (content: string) => {
    // Handle basic markdown-style formatting
    return content
      .split('**')
      .map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
      );
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-dsa-black">
            {data.title}
          </h1>
          <p className="text-lg text-dsa-slate">
            Last updated: {data.lastUpdated}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {data.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-start mb-4">
                {getSectionIcon(section.id)}
                <h2 className="ml-3 text-2xl font-bold text-dsa-black">
                  {section.title}
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-dsa-slate">
                <p className="mb-4">{renderContent(section.content)}</p>

                {/* Regular items list */}
                {section.items && (
                  <ul className="mb-4 space-y-2">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-dsa-red" />
                        <span>{renderContent(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Subsections */}
                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, index) => (
                      <div
                        key={index}
                        className="pl-4 border-l-2 border-dsa-red"
                      >
                        <h3 className="mb-2 text-lg font-semibold text-dsa-black">
                          {subsection.title}
                        </h3>
                        <p className="mb-2">
                          {renderContent(subsection.content)}
                        </p>
                        {subsection.items && (
                          <ul className="space-y-1">
                            {subsection.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-dsa-slate rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span className="text-sm">
                                  {renderContent(item)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact information */}
                {section.contact && (
                  <div className="p-4 mt-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <Mail className="w-4 h-4 mr-2 text-dsa-red" />
                      <span className="font-medium">Contact Information:</span>
                    </div>
                    <p>
                      Email:{' '}
                      <a
                        href={`mailto:${section.contact.email}`}
                        className="text-dsa-red hover:underline"
                      >
                        {section.contact.email}
                      </a>
                    </p>
                    <p>
                      Website:{' '}
                      <a
                        href={section.contact.website}
                        className="text-dsa-red hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {section.contact.website}
                      </a>
                    </p>
                  </div>
                )}

                {/* Third-party services */}
                {section.services && (
                  <div className="mt-4 space-y-3">
                    {section.services.map((service, index) => (
                      <div key={index} className="p-3 rounded bg-gray-50">
                        <h4 className="font-medium text-dsa-black">
                          {service.name}
                        </h4>
                        <p className="text-sm text-dsa-slate">
                          {service.purpose}
                        </p>
                        <p className="text-xs italic text-dsa-slate">
                          {service.privacy_policy}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact methods */}
                {section.contact_methods && (
                  <div className="mt-4 space-y-2">
                    {section.contact_methods.map((method, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-16 font-medium">
                          {method.method}:
                        </span>
                        {method.method === 'Email' ? (
                          <a
                            href={`mailto:${method.value}`}
                            className="text-dsa-red hover:underline"
                          >
                            {method.value}
                          </a>
                        ) : method.method === 'Website' ? (
                          <a
                            href={method.value}
                            className="flex items-center text-dsa-red hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {method.value}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        ) : (
                          <span>{method.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact info text */}
                {section.contact_info && (
                  <div className="p-3 mt-4 border border-blue-200 rounded bg-blue-50">
                    <p className="text-sm text-blue-800">
                      {section.contact_info}
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Legal Notice */}
        <div className="p-6 mt-12 text-white rounded-lg bg-dsa-black">
          <h2 className="mb-4 text-xl font-bold text-white">Legal Notice</h2>
          <p className="text-gray-300">{data.legalNotice}</p>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Mail className="w-5 h-5 mr-3 text-dsa-red" />
            <span className="mr-3 text-dsa-slate">
              Questions about privacy?
            </span>
            <a href="/contact" className="px-4 py-2 text-sm btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
