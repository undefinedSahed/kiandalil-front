"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Property {
  _id: string;
  title: string;
  subtitle: string;
  images: string[];
  country: string;
  state: string;
  city: string;
  address: string;
  quality: {
    bed: string;
    bath: string;
    sqrFt: string;
  };
  price?: number;
  createdAt: string;
}

// Mock data - replace with actual API call
const mockProperties: Property[] = [
  {
    _id: "1",
    title: "Four Bed Penthouse",
    subtitle: "Vacant | Furnished",
    images: ["/placeholder.svg?height=300&width=400"],
    country: "Germany",
    state: "Berlin",
    city: "Berlin",
    address: "Linienstraße 120, 10115 Berlin",
    quality: {
      bed: "4",
      bath: "2",
      sqrFt: "2200",
    },
    price: 211102,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    _id: "2",
    title: "Four Bed Penthouse",
    subtitle: "Vacant | Furnished",
    images: ["/placeholder.svg?height=300&width=400"],
    country: "Germany",
    state: "Berlin",
    city: "Berlin",
    address: "Linienstraße 120, 10115 Berlin",
    quality: {
      bed: "4",
      bath: "2",
      sqrFt: "2200",
    },
    price: 211102,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    _id: "3",
    title: "Four Bed Penthouse",
    subtitle: "Vacant | Furnished",
    images: ["/placeholder.svg?height=300&width=400"],
    country: "Germany",
    state: "Berlin",
    city: "Berlin",
    address: "Linienstraße 120, 10115 Berlin",
    quality: {
      bed: "4",
      bath: "2",
      sqrFt: "2200",
    },
    price: 211102,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    _id: "4",
    title: "Four Bed Penthouse",
    subtitle: "Vacant | Furnished",
    images: ["/placeholder.svg?height=300&width=400"],
    country: "Germany",
    state: "Berlin",
    city: "Berlin",
    address: "Linienstraße 120, 10115 Berlin",
    quality: {
      bed: "4",
      bath: "2",
      sqrFt: "2200",
    },
    price: 211102,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
];

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call
    const fetchProperties = async () => {
      try {
        // const response = await fetch('/api/v1/properties/user')
        // const data = await response.json()
        // setProperties(data.properties)

        // Using mock data for now
        setTimeout(() => {
          setProperties(mockProperties);
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast.error("Failed to fetch properties");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (propertyId: string) => {
    try {
      // Replace with actual API call
      // const response = await fetch(`/api/v1/properties/${propertyId}`, {
      //   method: 'DELETE'
      // })

      // if (response.ok) {
      setProperties((prev) => prev.filter((p) => p._id !== propertyId));
      toast.success("Property deleted successfully");
      // }
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  const handleEdit = (propertyId: string) => {
    // Navigate to edit page or open edit modal
    window.location.href = `/edit-property/${propertyId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#191919] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#191919] mb-4">
              Your Posts
            </h1>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-8">
                You haven't listed any properties yet.
              </p>
              <Button
                onClick={() => (window.location.href = "/list-property")}
                className="bg-[#191919] hover:bg-[#2a2a2a] text-white px-8 py-3"
              >
                List Your First Property
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {properties.map((property, index) => (
                <motion.div
                  key={property._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Property Image */}
                    <div className="relative h-64 md:h-48 rounded-xl overflow-hidden">
                      <Image
                        src={
                          property.images[0] ||
                          "/placeholder.svg?height=300&width=400"
                        }
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Property Details */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-[#191919] mb-2">
                              ${" "}
                              {property.price?.toLocaleString() ||
                                "Price on request"}
                            </h3>
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">
                              {property.title} | {property.subtitle}
                            </h4>
                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm">
                                Location: {property.address}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(property._id)}
                              className="p-2"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(property._id)}
                              className="p-2"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-gray-600 mb-4">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">
                              Multi Family
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              Bed {property.quality.bed}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              Bed {property.quality.bath}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {property.quality.sqrFt} sq ft
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Listed on{" "}
                          {new Date(property.createdAt).toLocaleDateString()}
                        </div>
                        <Button
                          variant="outline"
                          onClick={() =>
                            (window.location.href = `/property/${property._id}`)
                          }
                        >
                          View Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
