"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full backdrop-blur-sm">
      <div className="text-center p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold  mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg mb-6">
          We encountered an unexpected error. Please try again or contact
          support if the issue persists.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
        >
          Try Again
        </button>
        <div className="mt-4">
          <a href="/" className="text-blue-600 hover:underline">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
