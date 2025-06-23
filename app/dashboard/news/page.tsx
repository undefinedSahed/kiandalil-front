"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteNews, fetchAllNews } from "@/lib/api" // Removed unused imports
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog" // Import Dialog components
import NewsForm from "../news-posting/page" // Import the new NewsForm component

interface News {
    _id: string
    title: string
    subTitle: string
    description: string
    images: string[]
    createdAt: string
}

export default function ApprovePage() {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedNews, setSelectedNews] = useState<News | null>(null) // State to hold news data for editing

    const { data: allNews, isLoading } = useQuery({
        queryKey: ["allNews"],
        queryFn: fetchAllNews,
        select: (data) => data.data,
    })

    const { mutate: deleteNewsMutation } = useMutation({
        mutationFn: (id: string) => deleteNews(id),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["allNews"] })
            toast.success(data.message)
        },
        onError: (error: any) => {
            toast.error(error.message || "Something went wrong")
        },
    })

    const handleEdit = (news: News) => {
        setSelectedNews(news)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        deleteNewsMutation(id)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedNews(null)
        queryClient.invalidateQueries({ queryKey: ["allNews"] })
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A" // Handle cases where dateString might be undefined/null
        return (
            new Date(dateString).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }) +
            ", " +
            new Date(dateString).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            })
        )
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">Loading...</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">All News</h1>
                <Link href="/dashboard/news-posting"> {/* Keep this for adding new news */}
                    <Button>Add News</Button>
                </Link>
            </div>
            <div className="space-y-6">
                {allNews?.map((news: News) => (
                    <Card key={news._id} className="mb-4">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    {news.images && news.images.length > 0 && (
                                        <Image
                                            alt={news.title}
                                            src={news.images[0]}
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-lg font-semibold">{news.title}</h2>
                                        <p className="text-sm text-gray-500">{news.subTitle}</p>
                                        <p className="text-gray-500">{formatDate(news.createdAt)}</p>
                                    </div>
                                </div>

                                <div className="">
                                    <div
                                        className="prose prose-sm max-w-none text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: news.description || "",
                                        }}
                                    />
                                </div>

                                <div className="min-w-0 px-4">
                                    <div className="flex items-center space-x-4 flex-shrink-0">
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-green-600 border-green-600 hover:bg-green-50 px-4 py-1 text-xs"
                                                onClick={() => handleEdit(news)} // Pass the whole news object
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 border-red-600 hover:bg-red-50 px-4 py-1 text-xs"
                                                onClick={() => handleDelete(news._id)}
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {allNews?.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-500">No news available.</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Edit News Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit News</DialogTitle>
                        <DialogDescription>
                            Make changes to your news here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedNews && (
                        <NewsForm
                            initialData={selectedNews}
                            onSubmitSuccess={handleModalClose} // Close modal on success
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}