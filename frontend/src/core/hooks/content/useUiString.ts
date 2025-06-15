'use client';

import { useEffect, useState } from 'react';

export function useUiString(id: string, fallback: string): string {
  const [text, setText] = useState<string>(fallback);

  useEffect(() => {
    setText(fallback);
  }, [id, fallback]);

  return text;
}
