"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WishlistGrid } from "@/components/wishlist/wishlist-grid";
import { LoadingSkeleton } from "@/components/wishlist/loading-skeleton";
import { EmptyState } from "@/components/wishlist/empty-state";
import { fetchWishlist, removeFromWishlist } from "@/lib/api";
import type { WishlistResponse } from "@/lib/types";
import { toast } from "sonner";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please login to see your wishlist");
      router.push("/login");
    }
  }, [status, router]);

  const {
    data: wishlistResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<WishlistResponse>({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: status === "authenticated", // Only fetch if authenticated
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlist,
    onMutate: async (wishlistId: string) => {
      setRemovingIds((prev) => [...prev, wishlistId]);
    },
    onSuccess: (data, wishlistId) => {
      // Remove from local state optimistically
      queryClient.setQueryData<WishlistResponse>(["wishlist"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item) => item._id !== wishlistId),
          meta: {
            ...old.meta,
            totalItems: old.meta.totalItems - 1,
          },
        };
      });

      toast.success("Property removed from wishlist");
    },
    onError: (error, wishlistId) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove from wishlist"
      );
    },
    onSettled: (data, error, wishlistId) => {
      setRemovingIds((prev) => prev.filter((id) => id !== wishlistId));
    },
  });

  const handleRemoveFromWishlist = (wishlistId: string) => {
    removeFromWishlistMutation.mutate(wishlistId);
  };

  if (status !== "authenticated") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-500 mb-6">
              {error instanceof Error
                ? error.message
                : "Failed to load wishlist"}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const wishlistItems = wishlistResponse?.data || [];
  const totalItems = wishlistResponse?.meta?.totalItems || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wishlist</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Save your favorite properties in one place. Easily compare, revisit,
            and decide when the time is right.
          </p>
          {!isLoading && totalItems > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {totalItems} {totalItems === 1 ? "property" : "properties"} in
              your wishlist
            </p>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : !wishlistItems || wishlistItems.length === 0 ? (
          <EmptyState />
        ) : (
          <WishlistGrid
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            removingIds={removingIds}
          />
        )}
      </div>
    </div>
  );
}
