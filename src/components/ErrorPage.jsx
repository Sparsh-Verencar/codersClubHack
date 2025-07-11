"use client";

import React from "react";

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
      <h1 className="text-9xl font-extrabold text-red-600 tracking-widest">
        404
      </h1>
      <div className="bg-red-600 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="text-gray-500 mt-8 mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
      >
        Go Home
      </a>
    </main>
  );
}
