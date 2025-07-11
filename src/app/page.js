'use client';

import Auth from "../../auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter()
  const goToHome = () => {
    router.push("/home")
  }
  return (
    <div>
      <Button onClick={goToHome} >go to home</Button>
      <ModeToggle/>
    </div>
  );
}