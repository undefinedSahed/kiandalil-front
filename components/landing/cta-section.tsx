"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { stat } from "fs";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CTASection() {
  const { status } = useSession();

  return (
    <section className="relative px-6 ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat h-[537px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/CARBG.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col pt-[150px]   h-[537px] text-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 "
        >
          Start Finding Real Deals Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl mb-8 text-gray-200 w-[875px] "
        >
          Join a platform built for investors, wholesalers, agents, and owners
          who focus on real opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex gap-x-3 items-center"
        >
          <Link href="/all-listings">
            <Button className="">Browse Deals</Button>
          </Link>

          <Link
            href={`${
              status === "authenticated" ? "/list-property" : "/register"
            }`}
          >
            <Button className="">Post a Deal</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
