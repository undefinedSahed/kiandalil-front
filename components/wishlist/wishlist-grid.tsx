import type { WishlistItem } from "@/lib/types"
import { WishlistPropertyCard } from "./wishlist-card"

interface WishlistGridProps {
    wishlistItems: WishlistItem[]
    onRemoveFromWishlist?: (wishlistId: string) => void
    removingIds?: string[]
}

export function WishlistGrid({ wishlistItems, onRemoveFromWishlist, removingIds = [] }: WishlistGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((wishlistItem) => (
                <WishlistPropertyCard
                    key={wishlistItem._id}
                    wishlistItem={wishlistItem}
                    onRemoveFromWishlist={onRemoveFromWishlist}
                    isRemoving={removingIds.includes(wishlistItem._id)}
                />
            ))}
        </div>
    )
}
