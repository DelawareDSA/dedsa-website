export const a11y = {
  checkContrast: (fg: string, bg: string): number => {
    const luminance = (hex: string): number => {
      const cleaned = hex.replace('#', '');
      const full =
        cleaned.length === 3 ? cleaned.replace(/(.)/g, '$1$1') : cleaned;
      const num = parseInt(full, 16);
      const r = (num >> 16) & 0xff;
      const g = (num >> 8) & 0xff;
      const b = num & 0xff;

      const [rL, gL, bL] = [r, g, b].map((ch) => {
        const c = ch / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
    };

    const l1 = luminance(fg);
    const l2 = luminance(bg);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  },

  getAccessiblePair: (baseColor: string) => {
    const pairs: Record<string, { light: string; dark: string | null }> = {
      '#EC1F27': { light: '#FFFFFF', dark: '#231F20' },
      '#231F20': { light: '#FFFFFF', dark: null },
    };
    return pairs[baseColor] || { light: '#FFFFFF', dark: '#231F20' };
  },

  clampFontSize: (size: string): string => {
    const numSize = parseFloat(size);
    const unit = size.replace(/[0-9.]/g, '');
    const minSize = unit === 'px' ? 16 : 1;
    return `${Math.max(numSize, minSize)}${unit}`;
  },
};
