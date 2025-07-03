"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useState } from "react"
import { subscribeNewsletter } from "@/lib/api"
import { Loader } from "lucide-react"

const footerLinks = {
  Menu: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Latest News", href: "/news" },
    { name: "Contact", href: "/contact-us" },
  ],
  Support: [
    { name: "Help Center", href: "/contact-us" },
    { name: "FAQs", href: "/#faq" },
  ],
}

export default function Footer() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const res = await subscribeNewsletter(email);
      toast.success(res.message);
      setEmail("");
    } catch (error: any) {
      console.error("Subscription failed:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <footer className="bg-[#191919] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Realtor</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We provide comprehensive real estate services with a
              focus on customer satisfaction.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📍 123 Real Estate Ave, City, State 12345</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@realtor.com</p>
            </div>
          </motion.div>

          {/* Menu Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {footerLinks.Menu.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.Support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get the latest property updates and market insights.</p>
            <div className="space-y-3">
              <Input
                value={email}
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleSubscribe} disabled={loading} className="w-full bg-white text-[#191919] hover:bg-gray-100">
                {loading && <Loader className="animate-spin" />}
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Realtor. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
