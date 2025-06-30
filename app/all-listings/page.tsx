"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Phone,
  MessageCircle,
  ChevronLeft,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface Property {
  _id: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  images: string[];
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  features: string[];
  quality: {
    propertyType: string;
    houseType: string;
    bed: string;
    bath: string;
    sqrFt: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  price?: number;
  offMarket: boolean;
  createdAt: string;
}

function AllListingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "All Types",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    beds: searchParams.get("beds") || "Any",
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    sortBy: searchParams.get("sortBy") || "Most Recent",
  });

  // Add this state for cities
  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);

  // Add this function to fetch cities
  const fetchCities = useCallback(async () => {
    setCitiesLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all/properties/citys`
      );
      const data = await response.json();
      if (data.success) {
        setCities(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      toast.error("Failed to load cities");
    } finally {
      setCitiesLoading(false);
    }
  }, []);

  // Debounced search function
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Update URL parameters
  const updateURL = useCallback((newFilters: typeof filters) => {
    const params = new URLSearchParams();

    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.type !== "All Types") params.set("type", newFilters.type);
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.beds !== "Any") params.set("beds", newFilters.beds);
    if (newFilters.country) params.set("country", newFilters.country);
    if (newFilters.city) params.set("city", newFilters.city);
    if (newFilters.sortBy !== "Most Recent")
      params.set("sortBy", newFilters.sortBy);

    const newUrl = `/all-listings${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.pushState(null, "", newUrl);
  }, []);

  // Fetch properties
  const fetchProperties = useCallback(
    async (filtersToUse = filters, page = currentPage) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filtersToUse.search) params.set("search", filtersToUse.search);
        if (filtersToUse.type !== "All Types")
          params.set("type", filtersToUse.type);
        if (filtersToUse.minPrice)
          params.set("minPrice", filtersToUse.minPrice);
        if (filtersToUse.maxPrice)
          params.set("maxPrice", filtersToUse.maxPrice);
        if (filtersToUse.beds !== "Any") params.set("beds", filtersToUse.beds);
        if (filtersToUse.country) params.set("country", filtersToUse.country);
        if (filtersToUse.city) params.set("city", filtersToUse.city);

        params.set("page", page.toString());

        // Add sorting
        if (filtersToUse.sortBy === "Price Low to High") {
          params.set("sort", "price");
          params.set("order", "asc");
        } else if (filtersToUse.sortBy === "Price High to Low") {
          params.set("sort", "price");
          params.set("order", "desc");
        } else if (filtersToUse.sortBy === "Most Popular") {
          params.set("sort", "views");
          params.set("order", "desc");
        }

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/properties/approved/all?${params.toString()}`
        );

        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
          setTotalResults(data.total || data.data.length);
        }
      } catch (error) {
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    },
    [filters, currentPage]
  );

  // Debounced fetch function
  const debouncedFetch = useCallback(
    debounce((newFilters: typeof filters) => {
      fetchProperties(newFilters, 1);
      setCurrentPage(1);
    }, 500),
    [fetchProperties]
  );

  // Handle filter changes
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);

    // For search input, use debounced fetch, for others fetch immediately
    if (key === "search") {
      debouncedFetch(newFilters);
    } else {
      fetchProperties(newFilters, 1);
      setCurrentPage(1);
    }
  };

  // Handle manual search button click
  const handleSearch = () => {
    fetchProperties(filters, 1);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchProperties(filters, newPage);
  };

  // Initial load
  useEffect(() => {
    fetchProperties(filters, currentPage);
    fetchCities(); // Add this line
  }, []); // Only run once on mount

  const PropertyCard = ({ property }: { property: Property }) => (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={() => router.push(`/property/${property._id}`)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Property Images */}
        <div className="relative h-64 md:h-48">
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-medium z-10">
            {property.images.length}
          </div>
          <div className="grid grid-cols-2 gap-1 h-full">
            <div className="relative">
              <Image
                src={
                  property.images[0] || "/placeholder.svg?height=200&width=300"
                }
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-1">
              <div className="relative">
                <Image
                  src={
                    property.images[1] ||
                    "/placeholder.svg?height=100&width=150"
                  }
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <Image
                  src={
                    property.images[2] ||
                    "/placeholder.svg?height=100&width=150"
                  }
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="md:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#191919] mb-2">
                  ${property.price?.toLocaleString() || "521,102"}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {property?.title}
                </h4>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {property.city && `${property.city}, `}
                    {property.address}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-2">
                <Heart className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <span className="text-sm font-medium">{property.type}</span>
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">Bed {property.quality.bed}</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">Bath {property.quality.bath}</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.quality.sqrFt} sq ft</span>
              </div>
            </div>
          </div>

          {/* Agent Contact */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">
                  {property.userId.name.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-gray-800">
                {property.userId.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 bg-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 bg-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to listing</span>
            </Button>
            <span>/</span>
            <span>Home</span>
            <span>/</span>
            <span className="text-[#191919] font-medium">Buy</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <Input
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House Type
              </label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <Input
                placeholder="Country"
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <Select
                value={filters.city}
                onValueChange={(value) =>
                  handleFilterChange("city", value === "allCities" ? "" : value)
                }
                disabled={citiesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      citiesLoading ? "Loading cities..." : "All Cities"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allCities">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <Input
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                type="number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <Input
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                type="number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beds
              </label>
              <Select
                value={filters.beds}
                onValueChange={(value) => handleFilterChange("beds", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={handleSearch}
              className="bg-[#191919] hover:bg-[#2a2a2a] text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Sort:</span>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Most Recent">Most Recent</SelectItem>
                  <SelectItem value="Price Low to High">
                    Price Low to High
                  </SelectItem>
                  <SelectItem value="Price High to Low">
                    Price High to Low
                  </SelectItem>
                  <SelectItem value="Most Popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Properties For Sale</span>
            <span className="font-semibold text-[#191919]">
              {totalResults} results
            </span>
            {filters.city && (
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                in{" "}
                {cities.find(
                  (city) =>
                    city.toLowerCase().replace(/\s+/g, "-") === filters.city
                ) || filters.city}
              </span>
            )}
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No properties found
            </div>
            <p className="text-gray-400">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && properties.length > 0 && totalResults > 10 && (
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Page</span>
              <span className="font-semibold">{currentPage}</span>
              <span className="text-gray-600">of</span>
              <span className="font-semibold">
                {Math.ceil(totalResults / 10)}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= Math.ceil(totalResults / 10)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <AllListingsContent />
    </Suspense>
  );
}
