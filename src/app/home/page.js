"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const goToHomePage = ()=>{
    router.push("/")
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-9xl bg-sidebar-accent">
      egghead
      <Button onClick={goToHomePage}>root</Button>
      <ModeToggle/>
    </div>
  );
}
