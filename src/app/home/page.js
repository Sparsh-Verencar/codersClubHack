"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";

const Home = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      {/* Header / Navbar placeholder */}
      <div className="w-screen flex items-center justify-center">
        <Navbar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow bg-background text-foreground">
        <div className="flex items-center justify-center bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-[40vw] rounded-lg border border-border bg-popover text-popover-foreground"
          />
        </div>


        <div className="h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-background text-foreground p-4 rounded-lg shadow-md border border-border">
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
            rotateAmplitude={10}
          >
            hello
          </TiltedCard>
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
          >
            hello
          </TiltedCard>
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
          >
            hello
          </TiltedCard>
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
          >
            hello
          </TiltedCard>
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
          >
            hello
          </TiltedCard>
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
          >
            hello
          </TiltedCard>
          <TiltedCard
            className="bg-card text-card-foreground"
            imageSrc={"holi.webp"}
            captionText="holi"
            overlayContent={"holi"}
          >
            hello
          </TiltedCard>
        </div>

      </div>
    </div>
  );
};

export default Home;
