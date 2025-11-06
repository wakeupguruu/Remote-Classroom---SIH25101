"use client"
import React from 'react';
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full pl-6 pr-2.5 py-2.5 flex items-center justify-between backdrop-blur-lg rounded-full border font-body transition-all duration-300 bg-white/60 dark:bg-black/30 border-black/10 dark:border-white/10">
      <div className="text-gray-900/80 dark:text-white/80 text-xl font-bold italic">
        Classroom+
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 text-gray-800 dark:text-white/80 text-sm">
        <a 
          href="#" 
          className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          Home
        </a>
        <a 
          href="#" 
          className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          About Us
        </a>
        <a 
          href="#" 
          className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          Reviews
        </a>
      </div>

      <div className="flex items-center gap-2">
        <button
        onClick={()=>{
          window.location.href = "/login";
        }}
        className="px-4 py-2 rounded-full font-medium text-sm transition-transform duration-200 hover:scale-105 border backdrop-blur-lg bg-white/60 hover:bg-white/70 text-gray-900 border-white/30 shadow-sm dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/15">
          Try Classroom+
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;