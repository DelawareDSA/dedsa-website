import { forwardRef } from 'react';

import { ButtonProps } from '@/core/components/types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const baseClasses =
      'btn inline-flex items-center justify-center font-manifold-dsa font-bold rounded-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary:
        'btn-primary bg-dsa-red text-white hover:bg-dsa-red-t1 focus:ring-dsa-red',
      secondary:
        'btn-secondary bg-white text-dsa-red border-2 border-dsa-red hover:bg-dsa-red hover:text-white focus:ring-dsa-red',
      outline:
        'btn-outline bg-transparent text-dsa-red border-2 border-dsa-red hover:bg-dsa-red hover:text-white focus:ring-dsa-red',
    }[variant];

    const sizeClasses = {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    }[size];

    const minHeight = {
      sm: 'min-h-[36px]',
      md: 'min-h-[44px]',
      lg: 'min-h-[48px]',
    }[size];

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${minHeight} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
