// Common Tailwind class combinations for reuse
export const tailwindClasses = {
  // Layout
  container: 'container-page',
  section: 'py-16 relative overflow-hidden',

  // Components
  card: 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300',
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded transition-all duration-200',
    primary: 'bg-dsa-red text-white hover:bg-red-700',
    secondary: 'bg-white text-dsa-red hover:bg-gray-100',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },

  // Typography
  heading: {
    h1: 'text-4xl md:text-7xl font-bold mb-4',
    h2: 'text-3xl md:text-5xl font-bold mb-4',
    h3: 'text-2xl font-bold mb-2',
  },

  // Forms
  input:
    'w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50',
};

// Helper to combine Tailwind classes
export function tw(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
