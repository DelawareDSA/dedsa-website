/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/core/**/*.{js,ts,jsx,tsx,css}',
    './src/features/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        dsa: {
          red: {
            DEFAULT: '#EC1F27',
            t1: '#F04C53',
            t2: '#F4797E',
            t3: '#F7A5A9',
            t4: '#FBD2D4',
          },
          black: {
            DEFAULT: '#231F20',
            t1: '#514D4E',
            t2: '#7F7B7C',
            t3: '#ADA9AA',
            t4: '#DBD7D8',
          },
          cream: '#FFF3F5',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#ec1f27',
              '&:hover': {
                color: '#dc2626',
              },
            },
          },
        },
      },
      animation: {
        morphBlob: 'morphBlob 10s ease-in-out infinite alternate',
        pulse: 'pulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
