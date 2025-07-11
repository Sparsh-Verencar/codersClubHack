'use client';

import Auth from "../../auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Home from "./home/page";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter()
  const goToHome = () => {
    router.push("/home")
  }
  return (
    <div>
      <Home />
    </div>
  );
}