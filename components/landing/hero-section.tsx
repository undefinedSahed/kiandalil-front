"use client";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      router.push(
        `/all-listings?search=${encodeURIComponent(debouncedQuery.trim())}`
      );
    }
  }, [debouncedQuery]);

  return (
    <section className="relative h-[650px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container px-6 ">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Rent the Perfect Place, Stress-Free
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-gray-200"
        >
          From cozy apartments to spacious homes, we make renting simple and
          secure.
        </motion.p>
      </div>

      {/* Search Box */}
      <motion.div
        className="absolute bottom-0 transform -translate-x-1/2 mb-[-30px] max-w-[845px] w-full px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="bg-white rounded-full p-2 shadow-lg flex items-center gap-2">
          {/* Toggle Buttons */}
          <div className="flex">
            <button className="bg-[#191919] text-white px-6 py-3 rounded-full text-sm font-medium">
              All Properties
            </button>
            {/* <button className="text-gray-500 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50">
              Off Market
            </button> */}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="City, Building or Community"
              className="w-full pl-12 pr-4 py-3 text-gray-600 placeholder-gray-400 bg-transparent focus:outline-none"
            />
          </div>

          {/* Optional: Manual Search Button */}
          <button
            className="bg-[#191919] p-3 rounded-full hover:bg-gray-800 transition-colors"
            onClick={() => {
              if (searchQuery.trim()) {
                router.push(
                  `/all-listings?search=${encodeURIComponent(
                    searchQuery.trim()
                  )}`
                );
              }
            }}
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
