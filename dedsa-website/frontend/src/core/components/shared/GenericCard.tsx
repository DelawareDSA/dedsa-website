import { safeFilter } from '@/utils/safeFilter';
import { ReactNode } from 'react';

interface GenericCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
}

export default function GenericCard({
  children,
  className = '',
  title,
  hasBorder = true,
  hasShadow = true,
  isHoverable = false,
  onClick,
}: GenericCardProps) {
  const base = 'bg-white rounded-lg p-6';
  const border = hasBorder ? 'border border-gray-200' : '';
  const shadow = hasShadow ? 'shadow-md' : '';
  const hover = isHoverable
    ? 'hover:shadow-lg transition transform hover:-translate-y-1'
    : '';
  const cursor = onClick ? 'cursor-pointer' : '';

  const classes = [base, border, shadow, hover, cursor, className];

  return (
    <div
      className={safeFilter(classes, Boolean).join(' ')}
      onClick={onClick}
    >
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
}
