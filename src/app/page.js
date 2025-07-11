'use client';

import Auth from "../../auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "../components/Home";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Home/>
      {/* {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <Auth />
        </div>
      ) : (
        <Auth />
      )} */}
    </div>
  );
}