'use client';

import Auth from "../../auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter()
  const goToHome = () => {
    router.push("/home")
  }
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <Auth />
        </div>
      ) : (
        <Auth />
      )}
      <ModeToggle/>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Status Bar */}
      <div className="w-full bg-gray-900 text-white text-sm py-2 px-4 text-center">
        🌟 FestivalSphere: Discover new festivals worldwide!
      </div>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-20 py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-4">
          FestivalSphere
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
          Explore, discover, and experience festivals around the world.
          Find your next adventure, from vibrant parades to hidden cultural gems.
        </p>
        <button className="px-6 py-3 bg-blue-700 text-white rounded-full text-base shadow hover:bg-blue-800 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4 md:px-20 border-t border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-xl p-6 border border-gray-300 shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Interactive Map
            </h3>
            <p className="text-gray-600">
              Pinpoint festivals globally and plan your journey effortlessly.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 border border-gray-300 shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Festival Calendar
            </h3>
            <p className="text-gray-600">
              Keep track of festival dates, highlights, and updates.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 border border-gray-300 shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Community Reviews
            </h3>
            <p className="text-gray-600">
              Get real tips and stories from fellow festival explorers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-10 text-center bg-gray-200 border-t border-gray-300">
        <p className="mb-4 text-gray-700">
          Ready to discover your next festival?
        </p>
        <button className="px-6 py-3 bg-blue-700 text-white rounded-full text-base shadow hover:bg-blue-800 transition">
          Join Now
        </button>
        <p className="mt-6 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} FestivalSphere. All rights reserved.
        </p>
      </footer>
    </div>
    </div>
  );
}