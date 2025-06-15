import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-dsa-red">404</h1>
        <p className="mb-8 text-xl text-gray-600">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md bg-dsa-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
