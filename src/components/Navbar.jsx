"use client";
import React from 'react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from './ui/button';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';

const Navbar = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="w-[90vw] h-[10vh] bg-background text-foreground border border-border rounded-2xl m-5 px-6 flex items-center justify-between shadow-md">
      
      {/* Left Section - Logo and Profile */}
      <div className="flex items-center gap-4">
        <UserProfile />
        <h1 className="text-xl font-semibold">FestivalSphere</h1>
      </div>

      {/* Right Section - Toggle and Logout */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
