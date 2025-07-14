import { render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  it('renders without crashing', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
