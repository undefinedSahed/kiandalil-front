import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="rounded-full bg-gray-100 p-6 mb-6">
                <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
                Start exploring properties and add your favorites to your wishlist. You can easily compare and revisit them
                later.
            </p>
            <Link href="/all-listings">
                <Button>Browse Properties</Button>
            </Link>
        </div>
    )
}
