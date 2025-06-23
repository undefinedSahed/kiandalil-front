"use client"

import type React from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useRef, useMemo, useEffect } from "react" // Added useEffect
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { createNews, updateNews } from "@/lib/api" // Imported updateNews
import { toast } from "sonner"
import { Upload, X } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamic import with proper error handling for react-quill 2.0.0
const ReactQuill = dynamic(() => import("react-quill").then((mod) => mod.default), {
    ssr: false,
    loading: () => <div className="h-[200px] bg-gray-100 animate-pulse rounded border"></div>,
})

// Import Quill CSS normally - this is fine for client components
import "react-quill/dist/quill.snow.css"

// Schema
const newsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subTitle: z.string().min(1, "Subheading is required"),
    description: z.string().min(1, "Description is required"),
    image: z.any().nullable(), // For new uploads
    existingImage: z.string().nullable().optional(), // For displaying existing image URL
})

export type NewsFormValues = z.infer<typeof newsSchema>

interface NewsFormProps {
    initialData?: NewsFormValues & { _id?: string; images?: string[] } // Added _id and images for editing
    onSubmitSuccess?: () => void // Callback for successful submission
}

export default function NewsForm({ initialData, onSubmitSuccess }: NewsFormProps) {
    const [loading, setLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                [{ direction: "rtl" }], // RTL/LTR direction toggle
                ["link", "image"],
                ["blockquote", "code-block"],
                [{ script: "sub" }, { script: "super" }],
                ["clean"],
            ],
        }),
        [],
    )

    const formats = useMemo(
        () => [
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
            "indent",
            "align",
            "direction",
            "link",
            "image",
            "blockquote",
            "code-block",
            "script",
        ],
        [],
    )

    const form = useForm<NewsFormValues>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            description: "",
            image: null,
            existingImage: null,
        },
    })

    // Set form values and image preview when initialData changes (for editing)
    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                subTitle: initialData.subTitle,
                description: initialData.description,
                image: null, // Clear file input for new upload
                existingImage: initialData.images && initialData.images.length > 0 ? initialData.images[0] : null,
            })
            if (initialData.images && initialData.images.length > 0) {
                setImagePreview(initialData.images[0])
            }
        } else {
            // Reset for new news creation
            form.reset({
                title: "",
                subTitle: "",
                description: "",
                image: null,
                existingImage: null,
            })
            setImagePreview(null)
            setSelectedFile(null)
        }
    }, [initialData, form])

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleFile = (file: File) => {
        if (file.type.startsWith("image/")) {
            setSelectedFile(file)
            form.setValue("image", file)
            form.clearErrors("image") // Clear any previous image errors

            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            toast.error("Please select an image file")
            form.setError("image", { type: "manual", message: "Please select an image file" })
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const removeImage = () => {
        setSelectedFile(null)
        setImagePreview(null)
        form.setValue("image", null)
        form.setValue("existingImage", null) // Also clear existing image
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const onSubmit = async (values: NewsFormValues) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("subTitle", values.subTitle)
        formData.append("description", values.description)

        if (selectedFile && initialData?._id) {
            formData.append("images", selectedFile) // Use selectedFile directly
        }
        if (selectedFile && !initialData?._id) {
            formData.append("image", selectedFile) // Use selectedFile directly
        }


        try {
            setLoading(true)
            let res
            if (initialData?._id) {
                res = await updateNews(initialData._id, formData)
                toast.success(res.message)
            } else {
                res = await createNews(formData)
                toast.success(res.message)
            }

            form.reset()
            setSelectedFile(null)
            setImagePreview(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            onSubmitSuccess?.() // Call success callback
        } catch (error: any) {
            toast.error(error.message || "Failed to process news")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">{initialData ? "Edit News" : "Add News"}</h1>

            <div className="rounded-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Title" {...field} className="border-gray-300 focus:border-blue-400" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Subheading */}
                        <FormField
                            control={form.control}
                            name="subTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Subheading</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Subheading"
                                            {...field}
                                            className="border-gray-300 focus:border-blue-400"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                                    <FormControl>
                                        <div className="mt-2 rounded">
                                            <ReactQuill
                                                theme="snow"
                                                value={field.value}
                                                onChange={field.onChange}
                                                modules={modules}
                                                formats={formats}
                                                placeholder="Write About the News"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Upload Image */}
                        <FormField
                            control={form.control}
                            name="image" // Use 'image' for the file input
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Upload Image</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            {(imagePreview || form.watch("existingImage")) ? ( // Show preview if imagePreview or existingImage is present
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview || form.watch("existingImage") || "/placeholder.svg"}
                                                        alt="Preview"
                                                        className="w-full h-[400px] object-cover rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-600"
                                                        }`}
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                >
                                                    <Upload className="mx-auto h-12 w-12 text-white mb-4" />
                                                    <p className="text-white mb-4">Drop your files here</p>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="bg-gray-800 text-white hover:bg-gray-700"
                                                    >
                                                        Choose File
                                                    </Button>
                                                </div>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInput}
                                                className="hidden"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* The submit button is now part of the form, remove the standalone one */}
                        <Button
                            type="submit"
                            className="w-full mt-6 bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium"
                            disabled={loading}
                        >
                            {loading ? (initialData ? "Updating..." : "Posting...") : (initialData ? "Update News" : "Post News")}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}