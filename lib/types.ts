export interface PropertyQuality {
    propertyType: string
    bed: string
    bath: string
    sqrFt: string
}

export interface PropertyDetails {
    _id: string
    images: string[]
    title: string
    subtitle: string
    type: string
    description: string
    features: string[]
    userId: string
    approve: boolean
    price: number
    country: string
    state: string
    city: string
    zipCode: string
    address: string
    offMarket: boolean
    whatsappNum: string | null
    quality: PropertyQuality
    createdAt: string
    updatedAt: string
    __v: number
}

export interface WishlistItem {
    _id: string
    userId: string
    propertyId: PropertyDetails
    createdAt: string
    updatedAt: string
    __v: number
}

export interface WishlistResponse {
    success: boolean
    message: string
    data: WishlistItem[]
    meta: {
        currentPage: number
        totalPages: number
        totalItems: number
        itemsPerPage: number
    }
}
