'use client';

interface BlobProps {
  color?: string;
  className?: string;
  size?: string;
  animated?: boolean;
}

export default function Blob({
  color = 'rgba(236, 31, 39, 0.2)',
  className = '',
  size = '400px',
  animated = true,
}: BlobProps) {
  return (
    <div
      className={`absolute pointer-events-none ${animated ? 'animate-morphBlob' : 'blob-shape'} ${className}`}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
}
