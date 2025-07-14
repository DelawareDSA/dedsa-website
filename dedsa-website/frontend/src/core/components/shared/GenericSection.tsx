import { ReactNode } from 'react';

interface GenericSectionProps {
  heading: string;
  subheading?: string;
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary' | 'gradient';
  centered?: boolean;
}

export default function GenericSection({
  heading,
  subheading,
  children,
  className = '',
  background = 'white',
  centered = false,
}: GenericSectionProps) {
  const bgClasses = {
    white: 'bg-white ',
    gray: 'bg-dsa-red-t4',
    primary: 'bg-dsa-red text-white',
    gradient: 'bg-gradient-animated text-white',
  };

  return (
    <section
      className={`py-16 ${bgClasses[background]} relative overflow-hidden ${className}`}
    >
      <div className="container-page">
        <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl">{subheading}</p>}
          {centered && (
            <div className="w-24 h-1 bg-dsa-red mx-auto my-4 rounded"></div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
