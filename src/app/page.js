"use client";

import { useEffect } from "react";
import Auth from "../../auth";
import { ModeToggle } from '@/components/ui/mode-toggle';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Aurora from "@/components/Backgrounds/Aurora/Aurora";
import ShinyText from "@/components/TextAnimations/ShinyText/ShinyText";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export default function HomePage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user && !loading) {
      router.push("/home");
    }
  }, [user, loading, router]);

  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
  );

  const items = [
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: <Image src="/holi.webp" width={300} height={300} alt="Holi Festival" />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      header: <Image src="/africanTribe.webp" width={300} height={300} alt="African Tribe" />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Image src="/carnival.jpg" width={300} height={300} alt="Carnival" />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Power of Communication",
      description: "Understand the impact of effective communication in our lives.",
      header: <Image src="/nunavut.webp" width={300} height={300} alt="Nunavut Culture" />,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Pursuit of Knowledge",
      description: "Join the quest for understanding and enlightenment.",
      header: <Image src="/japanese.webp" width={300} height={300} alt="Japanese Festival" />,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
  ];

  // Guard against rendering content during loading or redirect
  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (user) return <p className="text-center py-4">Redirecting...</p>;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">


      <div className="absolute top-4 right-4 z-50 flex items-center justify-center">
        <Auth />
        <ModeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-20 py-20 overflow-hidden bg-gradient-to-b from-background via-muted to-background">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            FestivalSphere
          </h1>
          <ShinyText
            text="Explore, discover, and experience festivals around the world. Find your next adventure, from vibrant parades to hidden cultural gems."
            disabled={false}
            speed={30}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          />
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
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
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
