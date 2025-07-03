import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import type { WishlistItem } from "@/lib/types";
import Link from "next/link";

interface PropertyCardProps {
  wishlistItem: WishlistItem;
  onRemoveFromWishlist?: (wishlistId: string) => void;
  isRemoving?: boolean;
}

export function WishlistPropertyCard({
  wishlistItem,
  onRemoveFromWishlist,
  isRemoving,
}: PropertyCardProps) {
  const { propertyId } = wishlistItem;
  const mainImage =
    propertyId.images?.[0] || "/placeholder.svg?height=200&width=300";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Card className="group overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative">
      <CardContent className="p-0">
        {/* Heart/Remove button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemoveFromWishlist?.(wishlistItem._id);
          }}
          disabled={isRemoving}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isRemoving
                ? "fill-gray-400 text-gray-400"
                : "fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600"
            }`}
          />
        </Button>

        <Link href={`/property/${propertyId?._id}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={mainImage}
              alt={propertyId?.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Price badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
              <span className="text-sm font-semibold text-gray-900">
                {formatPrice(propertyId?.price)}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
              {propertyId?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-1">
              {propertyId?.subtitle}
            </p>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">
                {propertyId?.city}, {propertyId?.state}
              </span>
            </div>

            {/* Property details */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{propertyId?.quality.bed}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{propertyId?.quality.bath}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span className="text-xs">{propertyId?.quality.sqrFt}</span>
                </div>
              </div>
            </div>

            {/* Date added */}
            <p className="text-xs text-gray-400">
              Added {formatDate(wishlistItem.createdAt)}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
