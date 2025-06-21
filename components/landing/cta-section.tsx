"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="relative py-20 px-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Unlock Exclusive Property Access
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
        >
          Get first access to premium properties, exclusive deals, and personalized recommendations from our expert
          team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button className="bg-white text-[#191919] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
            Get Started Today
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#191919] px-8 py-3 rounded-full"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
