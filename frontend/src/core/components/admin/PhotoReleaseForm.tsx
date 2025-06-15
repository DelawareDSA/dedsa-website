'use client';

import { useState } from 'react';

interface PhotoReleaseFormProps {
  eventName: string;
  onSubmit: (data: PhotoReleaseData) => void;
}

interface PhotoReleaseData {
  memberName: string;
  email: string;
  eventName: string;
  consentGiven: boolean;
  signatureDate: string;
}

export default function PhotoReleaseForm({
  eventName,
  onSubmit,
}: PhotoReleaseFormProps) {
  const [formData, setFormData] = useState<PhotoReleaseData>({
    memberName: '',
    email: '',
    eventName,
    consentGiven: false,
    signatureDate: new Date().toISOString().split('T')[0],
  });

  return (
    <form className="max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-lg">
      <h3 className="mb-4 text-lg font-bold text-dsa-black">
        Photo Release Form
      </h3>
      <p className="mb-4 text-sm text-dsa-slate">
        Delaware DSA may take photos at this event for use in organizing
        materials, social media, and publications. Your consent is required.
      </p>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block mb-2 font-bold text-dsa-black">
          Full Name <span className="text-dsa-red">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.memberName}
          onChange={(e) =>
            setFormData({ ...formData, memberName: e.target.value })
          }
          className="w-full border-gray-300 rounded focus:border-dsa-red focus:ring-dsa-red"
          style={{ fontSize: 'max(16px, 1rem)' }}
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block mb-2 font-bold text-dsa-black">
          Email <span className="text-dsa-red">*</span>
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-gray-300 rounded focus:border-dsa-red focus:ring-dsa-red"
          style={{ fontSize: 'max(16px, 1rem)' }}
        />
      </div>

      {/* Consent Checkbox */}
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(e) =>
              setFormData({ ...formData, consentGiven: e.target.checked })
            }
            className="w-4 h-4 mt-1 mr-3 text-dsa-red focus:ring-dsa-red"
            required
          />
          <span className="text-sm text-dsa-slate">
            I consent to Delaware DSA photographing me at{' '}
            <strong>{eventName}</strong> and using my image in organizing
            materials, social media posts, and publications that advance our
            political work.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!formData.consentGiven}
        className="w-full py-2 font-bold btn-primary disabled:opacity-50"
      >
        Submit Release
      </button>
    </form>
  );
}
