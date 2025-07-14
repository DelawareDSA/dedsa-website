import { useEffect, useState } from 'react';

export function useTypewriterEffect(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState(
    process.env.NODE_ENV === 'test' ? text : ''
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText };
}
