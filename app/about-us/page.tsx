"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Mail, Phone } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#191919] text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-xl font-bold">Hidden Prop</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-gray-300">
              Buy
            </a>
            <a href="/" className="hover:text-gray-300">
              Wishlist
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
            <div className="relative group">
              <button className="hover:text-gray-300 flex items-center">
                About Company
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <a href="/list-property" className="hover:text-gray-300">
              List your property
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="p-2">
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
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="py-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-[#191919] mb-6">About Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We specialize in connecting clients with premium residential and
            investment properties. With a focus on trust, transparency, and
            market expertise, we offer personalized real estate solutions to
            help you find the perfect home or grow your portfolio.
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#191919] mb-6">
              About Your Website
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
              ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              Morbi condimentum porttitor turpis sed ultrices. Suspendisse
              auctor faucibus magna, imperdiet maximus orci ultricies a. Cras
              placerat elit a sagittis tristique. Etiam imperdiet pulvinar nisl
              in pellentesque. Sed ante orci, egestas id quam nec, eleifend
              varius magna. Fusce massa nisl, dignissim ut cursus et.
            </p>

            <h3 className="text-3xl font-bold text-[#191919] mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
              ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              Morbi condimentum porttitor turpis sed ultrices. Suspendisse
              auctor faucibus magna, imperdiet maximus orci ultricies a. Cras
              placerat elit a sagittis tristique. Etiam imperdiet pulvinar nisl
              in pellentesque. Sed ante orci, egestas id quam nec, eleifend
              varius magna. Fusce massa nisl.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-3xl font-bold text-[#191919] mb-2">30K+</h4>
                <p className="text-gray-600">Our Users</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-[#191919] mb-2">12K+</h4>
                <p className="text-gray-600">Satisfied Brand</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-[#191919] mb-2">2K+</h4>
                <p className="text-gray-600">Company List</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Modern apartment building"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* What We Offer */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#191919] mb-8">
            What We Offer
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
            ullamcorper.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#191919] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-600">
                Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse
                dictum facilisis ullamcorper. Maecenas vitae efficitur tortor,
                in placerat dui.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#191919] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-600">
                Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse
                dictum facilibus ullamcorper. Maecenas vitae efficitur tortor,
                in placerat dui.
              </p>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            euismod velit. Ut dapibus est urna. Suspendisse dictum facilibus
            ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
          </p>
        </motion.section>

        {/* Unique Business Content */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#191919] mb-8">
            Unique Business content
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            euismod velit. Ut dapibus est urna. Suspendisse dictum facilibus
            ullamcorper.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-[#191919] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-600">
                Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse
                dictum facilibus ullamcorper. Maecenas vitae efficitur tortor,
                in placerat dui.
              </p>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            euismod velit. Ut dapibus est urna. Suspendisse dictum facilibus
            ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
          </p>
        </motion.section>

        {/* Our Commitment */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#191919] mb-8">
            Our Commitment
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            euismod velit. Ut dapibus est urna. Suspendisse dictum facilibus
            ullamcorper. Maecenas vitae efficitur tortor, in placerat dui. Morbi
            condimentum porttitor turpis sed ultrices. Suspendisse auctor
            faucibus magna, imperdiet maximus orci ultricies a. Cras placerat
            elit a sagittis tristique. Etiam imperdiet pulvinar nisl in
            pellentesque. Sed ante orci, egestas id quam nec, eleifend varius
            magna. Fusce massa nisl, dignissim ut cursus et.
          </p>
        </motion.section>

        {/* Join Us */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#191919] mb-8">Join Us</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            euismod velit. Ut dapibus est urna. Suspendisse dictum facilibus
            ullamcorper. Maecenas vitae efficitur tortor, in placerat dui. Morbi
            condimentum porttitor turpis sed ultrices.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Suspendisse auctor faucibus magna, imperdiet maximus orci ultricies
            a. Cras placerat elit a sagittis tristique. Etiam imperdiet pulvinar
            nisl in pellentesque. Sed ante orci, egestas id quam nec, eleifend
            varius magna. Fusce massa nisl, dignissim ut cursus et.
          </p>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-[#191919] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Hidden Prop</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Discover hidden property gems with Hidden Prop – your trusted
                partner in finding, listing, and investing in real estate with
                ease and confidence.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Linienstraße 120, 10115 Berlin</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>biz@mail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1234 567 889</span>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Latest News
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-white text-[#191919] hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2025 HiddenProp All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
