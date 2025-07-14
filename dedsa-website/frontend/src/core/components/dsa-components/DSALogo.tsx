import Image from 'next/image';

interface DSALogoProps {
  variant?: 'red' | 'white';
  size?: 'small' | 'medium' | 'large';
}

export const DSALogo = ({ variant = 'red', size = 'medium' }: DSALogoProps) => {
  const sizes = { small: 24, medium: 48, large: 96 };
  const dimension = sizes[size];

  return (
    <Image
      src="/dedsa-logo.png"
      alt="DE DSA Logo"
      width={dimension}
      height={dimension}
      className={variant === 'white' ? 'invert' : ''}
    />
  );
};
