"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-[#D1D5D7]/20 border border-[#16465B]/30 rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="EduPath AI Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 hover:scale-110"
                priority
              />
              <span className="text-[#16465B] font-semibold text-xl">
                EduPath AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/careers"
                className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group"
              >
                <span className="relative z-10">Careers</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/grades"
                className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group"
              >
                <span className="relative z-10">Grades</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#chat"
                className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group"
              >
                <span className="relative z-10">Chat</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/profile"
                className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group"
              >
                <span className="relative z-10">Profile</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-6 py-2 text-[#16465B]/90 hover:text-[#16465B] transition-colors duration-200">
                Sign In
              </button>
              <button className="px-6 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-[#D1D5D7] rounded-full transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#16465B]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-[#16465B]/20">
              <div className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group py-1"
                >
                  <span className="relative z-10">Home</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="/careers"
                  className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group py-1"
                >
                  <span className="relative z-10">Careers</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="/grades"
                  className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group py-1"
                >
                  <span className="relative z-10">Grades</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#chat"
                  className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group py-1"
                >
                  <span className="relative z-10">Chat</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="/profile"
                  className="relative text-[#16465B]/90 hover:text-[#16465B] transition-all duration-300 group py-1"
                >
                  <span className="relative z-10">Profile</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16465B] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="px-4 py-2 text-[#16465B]/90 hover:text-[#16465B] transition-colors duration-200 text-left">
                    Sign In
                  </button>
                  <button className="px-4 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-[#D1D5D7] rounded-full transition-all duration-200">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
