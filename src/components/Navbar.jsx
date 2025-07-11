"use client";

import React from 'react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from './ui/button';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';

const Navbar = () => {
  return (
    <nav className="w-[100vw] h-[10vh] mx-auto px-6 flex items-center justify-between bg-amber-500 text-amber-50 shadow-lg">
      {/* Left side: Logo + Site Name */}
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png" // replace with your logo path
          alt="Logo"
          className="h-8 w-8 rounded-full"
        />
        <h1 className="text-2xl font-bold">MyCoolApp</h1>
      </div>

      {/* Middle: Nav Links */}
      <div className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-amber-900 transition">Home</a>
        <a href="#" className="hover:text-amber-900 transition">About</a>
        <a href="#" className="hover:text-amber-900 transition">Services</a>
        <a href="#" className="hover:text-amber-900 transition">Contact</a>
      </div>

      {/* Right side: Search + Mode Toggle */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-full text-amber-900 placeholder-amber-700 focus:outline-none"
        />
        <ModeToggle />
      </div>
    </nav>
  )
}
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error(err);
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
