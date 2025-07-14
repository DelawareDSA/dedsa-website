'use client';

import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function ConfettiButton({
  children,
  onClick,
  className = '',
  href,
}: ConfettiButtonProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleClick = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    if (onClick) onClick();
  }, [onClick]);

  const content = (
    <>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
          colors={['#ec1f27', '#ffffff', '#e11d48', '#f87171']}
        />
      )}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={handleClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={className}>
      {content}
    </button>
  );
}
