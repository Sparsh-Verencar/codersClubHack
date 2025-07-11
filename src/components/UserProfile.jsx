"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Image from "next/image";

const UserProfile = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    user && (
      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
        <Image
          src={user.photoURL || "/default-profile.png"}
          width={80}
          height={80}
          alt="User profile picture"
          className="object-cover"
        />
      </div>
    )
  );
};

export default UserProfile;
