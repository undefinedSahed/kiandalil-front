"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 2500,
    period: "/month",
    image: "/placeholder.svg?height=300&width=400",
    beds: 2,
    baths: 2,
    sqft: 1200,
    tag: "Featured",
  },
  {
    id: 2,
    title: "Luxury Condo",
    location: "Los Angeles, CA",
    price: 3200,
    period: "/month",
    image: "/placeholder.svg?height=300&width=400",
    beds: 3,
    baths: 2,
    sqft: 1500,
    tag: "New",
  },
  {
    id: 3,
    title: "Downtown Loft",
    location: "Chicago, IL",
    price: 1800,
    period: "/month",
    image: "/placeholder.svg?height=300&width=400",
    beds: 1,
    baths: 1,
    sqft: 900,
    tag: "Popular",
  },
  {
    id: 4,
    title: "Beachfront Villa",
    location: "Miami, FL",
    price: 4500,
    period: "/month",
    image: "/placeholder.svg?height=300&width=400",
    beds: 4,
    baths: 3,
    sqft: 2200,
    tag: "Luxury",
  },
  {
    id: 5,
    title: "City View Studio",
    location: "San Francisco, CA",
    price: 2800,
    period: "/month",
    image: "/placeholder.svg?height=300&width=400",
    beds: 1,
    baths: 1,
    sqft: 800,
    tag: "Featured",
  },
  {
    id: 6,
    title: "Garden Apartment",
    location: "Seattle, WA",
    price: 2100,
    period: "/month",
    image: "/placeholder.svg?height=300&width=400",
    beds: 2,
    baths: 1,
    sqft: 1100,
    tag: "New",
  },
]

const categories = ["All", "Recommended", "Apartment", "Villa", "House"]

{
  /* Property Card Component */
}
const PropertyCard = ({ property, index }: { property: any; index: number }) => (
  <motion.div
    className="relative bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
  >
    {/* Property Image */}
    <div className="relative h-64">
      <Image
        src={property.image || "/placeholder.svg"}
        alt={property.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Badges */}
      <div className="absolute top-4 left-4">
        <span className="bg-[#191919] text-white px-3 py-1 rounded-full text-sm font-medium">For Sale</span>
      </div>

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
        <Heart className="w-5 h-5 text-white" />
      </button>

      {/* Property Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white text-xl font-semibold mb-2">{property.title}</h3>

        <div className="flex items-center text-white/90 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-white/90 text-sm">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.sqft} sq ft</span>
            </div>
          </div>

          <div className="text-white font-bold text-lg">${property.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function FeaturedProperties() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of premium properties
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-[#191919] hover:bg-[#2a2a2a]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <PropertyCard property={property} index={index} key={property.id} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button className="bg-[#191919] hover:bg-[#2a2a2a] text-white px-8 py-3 rounded-full">
            View All Properties
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
