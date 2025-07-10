'use client';

import Auth from "../../auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
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
    </div>
  );
}