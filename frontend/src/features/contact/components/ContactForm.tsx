'use client';

import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please consent to data processing');
      return;
    }

    setIsSubmitting(true);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setIsSubmitting(false);
    // Handle response...
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-dsa-black">
          Name <span className="text-dsa-red">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
          style={{ fontSize: 'max(16px, 1rem)' }}
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-dsa-black">
          Email <span className="text-dsa-red">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
          style={{ fontSize: 'max(16px, 1rem)' }}
        />
      </div>

      {/* Subject Field */}
      <div className="mb-4">
        <label
          htmlFor="subject"
          className="block mb-2 font-bold text-dsa-black"
        >
          Subject <span className="text-dsa-red">*</span>
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
          style={{ fontSize: 'max(16px, 1rem)' }}
        />
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block mb-2 font-bold text-dsa-black"
        >
          Message <span className="text-dsa-red">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
          style={{ fontSize: 'max(16px, 1rem)' }}
        />
      </div>

      {/* Consent Checkbox - REQUIRED for DSA compliance */}
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) =>
              setFormData({ ...formData, consent: e.target.checked })
            }
            className="w-4 h-4 mt-1 mr-3 border-gray-300 rounded text-dsa-red focus:ring-dsa-red"
            required
          />
          <span className="text-sm text-dsa-slate">
            I consent to Delaware DSA storing my contact information for up to
            18 months to respond to this inquiry. Data will be stored securely
            and not shared with third parties.
            <a href="/privacy" className="ml-1 text-dsa-red hover:underline">
              Read our privacy policy
            </a>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.consent}
        className="w-full py-3 text-lg font-bold btn-primary disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
