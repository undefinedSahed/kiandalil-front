"use client"

import { motion } from "framer-motion"

const stats = [
  {
    id: 1,
    number: "200+",
    label: "Apartments",
    description: "Available Properties",
  },
  {
    id: 2,
    number: "20k+",
    label: "Customers",
    description: "Happy Clients",
  },
  {
    id: 3,
    number: "100+",
    label: "Good Reviews",
    description: "Positive Feedback",
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#191919] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievement</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-xl font-semibold text-gray-300 mb-1">{stat.label}</div>
              <div className="text-gray-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
