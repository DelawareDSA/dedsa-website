export const DesignTokens = {
  colors: {
    primary: '#EC1F27',
    primaryTints: ['#F04C53', '#F4797E', '#F7A5A9', '#FBD2D4'],
    black: '#231F20',
    blackTints: ['#514D4E', '#7F7B7C', '#ADA9AA', '#DBD7D8'],
    cream: '#FFF3F5',

    accessible: {
      redOnWhite: { bg: '#FFFFFF', text: '#EC1F27', ratio: 4.5 },
      whiteOnRed: { bg: '#EC1F27', text: '#FFFFFF', ratio: 8.6 },
      blackOnCream: { bg: '#FFF3F5', text: '#231F20', ratio: 18.9 },
    },
  },

  typography: {
    fontFamilies: {
      primary: 'Manifold DSA, Klima, -apple-system, sans-serif',
      heading: 'Styrene B, Manifold DSA Black, sans-serif',
      longForm: 'Roboto Slab, Georgia, serif',
    },
    scale: {
      '4xl': { size: '4rem', lineHeight: 1.1, tracking: '-0.02em' },
      '3xl': { size: '3rem', lineHeight: 1.2, tracking: '-0.01em' },
      '2xl': { size: '2.25rem', lineHeight: 1.3, tracking: '0' },
      xl: { size: '1.75rem', lineHeight: 1.4, tracking: '0' },
      lg: { size: '1.25rem', lineHeight: 1.5, tracking: '0' },
      base: { size: '1rem', lineHeight: 1.6, tracking: '0' },
      sm: { size: '0.875rem', lineHeight: 1.5, tracking: '0.08em' },
    },
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },

  layout: {
    maxWidth: '1280px',
    gutter: '1.5rem',
    logoRatio: { top: 5, logo: 13, bottom: 2 },
  },
  animations: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    easing: {
      default: 'cubic-bezier(0.4,0,0.2,1)',
      smooth: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      bounce: 'cubic-bezier(0.68,-0.55,0.265,1.55)',
    },
    transformOrigin: {
      center: 'center',
      top: 'top center',
      bottom: 'bottom center',
    },
  },

  gradients: {
    mesh: {
      primary: `radial-gradient(at 40% 20%, #EC1F27 0%, transparent 50%), radial-gradient(at 80% 0%, #F04C53 0%, transparent 50%), radial-gradient(at 0% 50%, #F4797E 0%, transparent 50%)`,
      secondary: `radial-gradient(at 60% 80%, #231F20 0%, transparent 50%), radial-gradient(at 20% 100%, #514D4E 0%, transparent 50%)`,
    },
    glass: {
      light:
        'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      dark: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
    },
  },

  glass: {
    backdrop: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.18)',
    shadow: '0 8px 32px rgba(31,38,135,0.37)',
  },

  glow: {
    primary: '0 0 20px #EC1F27',
    secondary: '0 0 15px #231F20',
    intense: '0 0 30px #EC1F27,0 0 60px #F04C53',
  },
};
