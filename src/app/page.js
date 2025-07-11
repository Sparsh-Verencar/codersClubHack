'use client';

import { useEffect } from "react";
import Auth from "../../auth";
import { ModeToggle } from '@/components/ui/mode-toggle';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Aurora from "@/components/Backgrounds/Aurora/Aurora";
import ShinyText from "@/components/TextAnimations/ShinyText/ShinyText";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/home");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Auth/Redirect */}
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : user ? (
        <p className="text-center py-4">Redirecting...</p>
      ) : (
        <Auth />
      )}

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-20 py-20 overflow-hidden bg-gradient-to-b from-background via-muted to-background">
        {/* Aurora Background */}
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            FestivalSphere
          </h1>
            <ShinyText text="Explore, discover, and experience festivals around the world.
            Find your next adventure, from vibrant parades to hidden cultural gems." 
            disabled={false} 
            speed={30} 
            className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto' />
           
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-base shadow hover:brightness-90 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-16 px-4 md:px-20 border-t border-border">
        <h2 className="text-3xl font-semibold text-center text-primary mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Interactive Map",
              desc: "Pinpoint festivals globally and plan your journey effortlessly.",
            },
            {
              title: "Festival Calendar",
              desc: "Keep track of festival dates, highlights, and updates.",
            },
            {
              title: "Community Reviews",
              desc: "Get real tips and stories from fellow festival explorers.",
            },
          ].map(({ title, desc }, idx) => (
            <div
              key={idx}
              className="bg-muted rounded-xl p-6 border border-border shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-medium text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center bg-muted border-t border-border">
        <p className="mb-4 text-muted-foreground">
          Ready to discover your next festival?
        </p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-base shadow hover:brightness-90 transition">
          Join Now
        </button>
        <p className="mt-6 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} FestivalSphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
