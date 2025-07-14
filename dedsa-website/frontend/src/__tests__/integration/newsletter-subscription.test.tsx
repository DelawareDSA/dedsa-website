import NewsletterSubscription from '@/core/components/ui/NewsletterSubscription';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Newsletter Subscription Flow', () => {
  it('completes subscription successfully', async () => {
    const user = userEvent.setup();
    render(<NewsletterSubscription />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<NewsletterSubscription />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('prevents duplicate submissions', async () => {
    const user = userEvent.setup();
    render(<NewsletterSubscription />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/subscribing/i);
  });
});
