'use client';

import { useState } from 'react';

import { SubscriptionStatus } from '@/core/types/hooks';

export function useNewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 50));

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return {
    email,
    setEmail,
    status,
    errorMessage,
    subscribe,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error',
    reset: () => {
      setStatus('idle');
      setErrorMessage('');
    },
  };
}
