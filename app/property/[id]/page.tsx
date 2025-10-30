"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  Images,
  Map,
  ZoomIn,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
  whatsappNum?: number | null;
  phoneNum?: string | null;
  createdAt: string;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendedProperties, setRecommendedProperties] = useState<
    Property[]
  >([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const session = useSession();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/${params.id}`
        );
        const data = await response.json();
        if (data.success) {
          setProperty(data.data);
          // Fetch recommended properties
          fetchRecommendedProperties();
        }
      } catch (error) {
        toast.error("Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedProperties = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/approved/all?limit=3`
        );
        const data = await response.json();
        if (data.success) {
          setRecommendedProperties(data.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch recommended properties");
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const handlePhoneCall = () => {
    if (property?.phoneNum) {
      window.location.href = `tel:${property.phoneNum}`;
    } else {
      toast.error("Phone number not available");
    }
  };

  const handleWhatsApp = () => {
    if (property?.whatsappNum) {
      const message = encodeURIComponent(
        `Hi, I'm interested in the property: ${
          property.title
        } - $${property.price?.toLocaleString()}`
      );
      const whatsappUrl = `https://wa.me/${property.whatsappNum}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    } else {
      toast.error("WhatsApp number not available");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: property?.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const ImageGalleryModal = () => (
    <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            onClick={() => setShowImageModal(false)}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="relative h-[70vh]">
            <Image
              src={property?.images[selectedImageIndex] || "/placeholder.svg"}
              alt={property?.title || "Property"}
              fill
              className="object-cover"
            />
            {/* <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 bg-black/50 text-white hover:bg-black/70"
            >
              <ZoomIn className="w-4 h-4 mr-2" />
              Zoom
            </Button> */}
          </div>
          <div className="flex items-center justify-between p-4 bg-black/80 text-white">
            <span>
              {selectedImageIndex + 1} of {property?.images.length}
            </span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev > 0 ? prev - 1 : (property?.images.length || 1) - 1
                  )
                }
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev < (property?.images.length || 1) - 1 ? prev + 1 : 0
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {property?.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-16 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
                  index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Property ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#191919] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Property Not Found
          </h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

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
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>
              <Link href="/all-listings">Properties</Link>
            </span>
            <span>/</span>
            <span>{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Dynamic image grid based on number of images */}
          {property.images.length === 0 ? (
            <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/placeholder.svg"
                alt="No images available"
                fill
                className="object-cover"
              />
            </div>
          ) : property.images.length === 1 ? (
            <div className="relative h-[70vh] w-full rounded-2xl overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
          ) : property.images.length === 2 ? (
            <div className="grid grid-cols-2 gap-4 h-96">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={property.images[1]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 h-96">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={property.images[1]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={property.images[2]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Photos button - only show if there are images */}
          {property.images.length > 0 && (
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowImageModal(true)}
                className="bg-white/90 hover:bg-white"
              >
                <Images className="w-4 h-4 mr-2" />
                {property.images.length} Photos
              </Button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-[#191919] mb-4">
                {property.title}
              </h1>
              <h2 className="text-3xl font-bold text-[#191919] mb-4">
                ${property.price?.toLocaleString()}
              </h2>
              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  <span>{property.quality.bed}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2" />
                  <span>{property.quality.bath}</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-5 h-5 mr-2" />
                  <span>{property.quality.sqrFt} sq ft</span>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {property.quality.bed} Beds
              </h2>
              <p className="text-gray-600 mb-6">
                {property.quality.bed} Bedroom Apartment for Sale in{" "}
                {property.address}
              </p>
            </motion.div>

            {/* Property Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#191919] mb-4">
                Property Description
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {property.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                This building offers excellent fitness facilities, fully
                equipped fitness center, secure parking, and 24/7 concierge
                services, while the neighborhood is home to a variety of cafes,
                restaurants, and boutiques. Situated in a prime location, it's
                just minutes away from iconic landmarks like Brandenburg Gate
                and Museum Island. This location provides seamless access to
                Berlin's vibrant cultural and transportation hubs.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#191919] mb-4">
                Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#191919] rounded-full mr-3"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387196.07665879064!2d-74.30914977179596!3d40.69667269554806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1751298686992!5m2!1sen!2sbd"
                  width="1000"
                  height="450"
                  loading="lazy"
                ></iframe>
                <div className="relative -mt-12 text-center">
                  <Button variant="outline" className="bg-white">
                    View larger map
                  </Button>
                </div>
              </div>
            </motion.div> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {property.userId.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#191919]">
                    {property.userId.name}
                  </h4>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-[#191919] hover:bg-[#2a2a2a] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!session?.data?.user) {
                      toast.error("Please login to view contact details");
                      return;
                    }
                    handlePhoneCall();
                  }}
                  disabled={!property.phoneNum}
                  title={
                    !session?.data?.user
                      ? "Login to view contact details"
                      : undefined
                  }
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {!session?.data?.user
                    ? "Login to Call"
                    : property.phoneNum
                    ? "Call"
                    : "Phone Not Available"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!session?.data?.user) {
                      toast.error("Please login to view contact details");
                      return;
                    }
                    handleWhatsApp();
                  }}
                  disabled={!property.whatsappNum}
                  title={
                    !session?.data?.user
                      ? "Login to view contact details"
                      : undefined
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {!session?.data?.user
                    ? "Login to Chat"
                    : property.whatsappNum
                    ? "WhatsApp"
                    : "WhatsApp Not Available"}
                </Button>

                {/* <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a viewing
                </Button> */}

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share this Listing
                </Button>
              </div>

              {/* Contact Info Display - Only shown when logged in */}
              {session?.data?.user &&
                (property.phoneNum || property.whatsappNum) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Contact Information:
                    </h5>
                    {property.phoneNum && (
                      <p className="text-sm text-gray-600 mb-1">
                        <Phone className="w-3 h-3 inline mr-1" />
                        Phone: {property.phoneNum}
                      </p>
                    )}
                    {property.whatsappNum && (
                      <p className="text-sm text-gray-600">
                        <MessageCircle className="w-3 h-3 inline mr-1" />
                        WhatsApp: {property.whatsappNum}
                      </p>
                    )}
                  </div>
                )}
            </motion.div>
          </div>
        </div>

        {/* Recommended Properties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-[#191919] mb-8">
            Recommended for you
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProperties.map((recProperty) => (
              <div
                key={recProperty._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/property/${recProperty._id}`)}
              >
                <div className="relative h-48">
                  <Image
                    src={recProperty.images[0] || "/placeholder.svg"}
                    alt={recProperty.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">
                    ${recProperty.price?.toLocaleString() || "521,102"}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {recProperty.quality.bed} Beds High Quality Luxury Lifestyle
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{recProperty.type}</span>
                    <span>Bed {recProperty.quality.bed}</span>
                    <span>Bath {recProperty.quality.bath}</span>
                    <span>{recProperty.quality.sqrFt} sq ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ImageGalleryModal />
    </div>
  );
}
