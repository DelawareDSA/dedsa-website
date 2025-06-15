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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const recipientEmail = 'delaware.socialists@gmail.com';
    const subject =
      formData.subject || `Contact form submission from ${formData.name}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the Delaware DSA contact form.`;

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setIsSubmitting(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-bold text-dsa-black">
            Name <span className="text-dsa-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
            style={{ fontSize: 'max(16px, 1rem)' }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-bold text-dsa-black"
          >
            Email <span className="text-dsa-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
            style={{ fontSize: 'max(16px, 1rem)' }}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block mb-2 font-bold text-dsa-black"
          >
            Subject
          </label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
            style={{ fontSize: 'max(16px, 1rem)' }}
          >
            <option value="">Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Membership">Membership</option>
            <option value="Events">Events</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 font-bold text-dsa-black"
          >
            Message <span className="text-dsa-red">*</span>
          </label>
          <textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Your message"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
            style={{ fontSize: 'max(16px, 1rem)' }}
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) =>
              setFormData({ ...formData, consent: e.target.checked })
            }
            className="w-4 h-4 mt-1 mr-2 border-gray-300 rounded text-dsa-red focus:ring-dsa-red"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I consent to having Delaware DSA process my personal data according
            to the{' '}
            <a href="/privacy" className="text-dsa-red hover:underline">
              privacy policy
            </a>
            . <span className="text-dsa-red">*</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 font-semibold text-white rounded-md bg-dsa-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-dsa-red focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? 'Opening Email...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
