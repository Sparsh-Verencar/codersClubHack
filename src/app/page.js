'use client';

import { useEffect } from "react";
import Auth from "../../auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/home"); // Redirect to /home after login
    }
  }, [user, loading, router]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <p>Redirecting...</p> // Optional: user feedback
      ) : (
        <Auth />
      )}
    </div>
  );
}
