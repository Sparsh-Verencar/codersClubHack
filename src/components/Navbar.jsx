import React from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'

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

export default Navbar
