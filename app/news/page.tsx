"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchAllNews } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface NewsItem {
    _id: string
    title: string
    subTitle: string
    description: string
    images: string[]
    createdAt: string
    updatedAt: string
}

export default function NewsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const {
        data: newsData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["news"],
        queryFn: fetchAllNews,
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        })
    }

    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, "")
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="h-96 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-500">Failed to load news. Please try again later.</p>
            </div>
        )
    }

    const news: NewsItem[] = newsData?.data || []
    const featuredNews = news[0]
    const sidebarNews = news.slice(1, 5)
    const gridNews = news.slice(5)

    const filteredGridNews = gridNews.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.subTitle.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">News</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Latest News and Highlights from the Real Estate Market
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    We combine market expertise with personalized service to deliver a seamless real estate experience. Whether
                    you're buying, selling, investing, or building your career, we offer trusted guidance and real value every
                    step of the way.
                </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Featured and Sidebar News */}
            {featuredNews && (
                <div className="grid lg:grid-cols-3 gap-8 mb-16 items-center">
                    {/* Featured News */}
                    <div className="lg:col-span-2">
                        <Link href={`/news/${featuredNews._id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="aspect-[10/5] relative">
                                    <Image
                                        src={featuredNews.images[0]}
                                        alt={featuredNews.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">{featuredNews.title}</h2>
                                    <p className="text-muted-foreground mb-4">{featuredNews.subTitle}</p>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {formatDate(featuredNews.createdAt)}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Sidebar News */}
                    <div className="">
                        {sidebarNews.map((item) => (
                            <Link key={item._id} href={`/news/${item._id}`}>
                                <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer lg:py-5 lg:px-2 lg:my-4">
                                    <div className="flex items-center">
                                        <div className="w-24 h-20 relative flex-shrink-0">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4 flex-1">
                                            <h3 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{item.subTitle}</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Grid News */}
            {filteredGridNews.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGridNews.map((item) => (
                        <Link key={item._id} href={`/news/${item._id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <div className="aspect-video relative">
                                    <Image
                                        src={item.images[0] || "/placeholder.svg?height=200&width=300"}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.subTitle}</p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formatDate(item.createdAt)}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {searchTerm && filteredGridNews.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No news found matching your search.</p>
                </div>
            )}
        </div>
    )
}
