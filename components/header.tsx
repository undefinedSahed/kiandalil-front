"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, UserCircle } from "lucide-react"; // Import ChevronDown and UserCircle
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signIn, signOut } from "next-auth/react"; // Import useSession, signIn, and signOut

const navigationItems = [
  { name: "Buy", href: "#" },
  { name: "Rent", href: "#" },
  { name: "Contact", href: "#" },
  {
    name: "About Company",
    href: "#",
    dropdown: [
      { name: "Contact Us", href: "/contact-us" },
      { name: "About Us", href: "/about-us" },
    ],
  },
  { name: "List of properties", href: "#" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for hover dropdown
  const { data: session, status } = useSession(); // Get session data and status

  return (
    <header className="bg-[#191919] text-white py-2 px-6 relative z-50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl text-center font-bold">
          Hidden
          <br />
          Props
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu
                key={item.name}
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1 cursor-pointer outline-none "
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" /> {/* Down icon */}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-[#191919] text-white border-gray-700 "
                  onMouseEnter={() => setIsDropdownOpen(true)} // Keep open when hovering content
                  onMouseLeave={() => setIsDropdownOpen(false)} // Close when leaving content
                >
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.name}>
                      <Link
                        href={dropdownItem.href}
                        className="block w-full py-1"
                      >
                        {dropdownItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Auth Buttons/Profile Icon */}
        <div className="flex items-center space-x-4">
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <UserCircle className="h-6 w-6" /> {/* Profile icon */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#191919] text-white border-gray-700 ">
                {session?.user?.name && (
                  <DropdownMenuItem className="opacity-100 cursor-default">
                    <span className="font-bold">{session.user.name}</span>
                  </DropdownMenuItem>
                )}
                {session?.user?.email && (
                  <DropdownMenuItem className="opacity-100 cursor-default">
                    <span className="text-gray-400 text-sm">
                      {session.user.email}
                    </span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Button
                    onClick={() => signOut()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-1"
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => signIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-[#191919] border-t border-gray-700 py-4"
        >
          {navigationItems.map((item) =>
            item.dropdown ? (
              // For mobile, we'll keep the click-to-expand behavior for "About Company"
              <div key={item.name}>
                <button
                  className="block w-full text-left px-6 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => {}} // You might want to add state here to toggle dropdown for mobile
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />{" "}
                </button>

                <div className="pl-8">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </motion.nav>
      )}
    </header>
  );
}
