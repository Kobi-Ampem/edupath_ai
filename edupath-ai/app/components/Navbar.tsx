"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication state on mount and when localStorage changes
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      const email = localStorage.getItem("userEmail");
      setIsAuthenticated(auth === "true");
      setUserEmail(email);
    };

    checkAuth();

    // Listen for storage changes (useful for cross-tab updates)
    window.addEventListener("storage", checkAuth);

    // Custom event listener for same-tab auth changes
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleGetStarted = () => {
    router.push("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(null);
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

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
                href="/chat"
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
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={handleSignIn}
                  className="px-6 py-2 text-[#16465B]/90 hover:text-[#16465B] transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-[#D1D5D7] rounded-full transition-all duration-200"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-2 text-[#16465B]/90">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm">
                    {userEmail ? userEmail.split("@")[0] : "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-[#16465B]/90 hover:text-[#16465B] transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}

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
                  href="/chat"
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
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-2 pt-4">
                    <button
                      onClick={handleSignIn}
                      className="px-4 py-2 text-[#16465B]/90 hover:text-[#16465B] transition-colors duration-200 text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGetStarted}
                      className="px-4 py-2 bg-[#16465B] hover:bg-[#16465B]/90 text-[#D1D5D7] rounded-full transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-[#16465B]/20">
                    <div className="flex items-center space-x-2 px-4 py-2 text-[#16465B]/90">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm">
                        {userEmail ? userEmail.split("@")[0] : "User"}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-[#16465B]/90 hover:text-[#16465B] transition-colors duration-200 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
