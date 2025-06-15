'use client';

import { useNewsletterSubscription } from '@/core/hooks/useNewsletterSubscription';
import Button from './Button';

export default function NewsletterSubscription() {
  const { email, setEmail, errorMessage, subscribe, isSubmitting, isSuccess } =
    useNewsletterSubscription();

  return (
    <form className="flex flex-col space-y-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1"
      />
      <Button type="submit" disabled={isSubmitting} onClick={subscribe}>
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {isSuccess && <p>Successfully subscribed!</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
