// components/Auth.js
"use client"
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button variant={"outline"} onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  );
}