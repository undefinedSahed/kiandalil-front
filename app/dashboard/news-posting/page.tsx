"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { createNews } from "@/lib/api"
import { FileUploader } from "./_components/file-uploader" // Custom component, see below
import { toast } from "sonner"

// Dynamically import react-quill
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <div className="h-[200px] bg-gray-100 animate-pulse rounded border"></div>,
})

// Schema
const newsSchema = z.object({
    title: z.string().min(1),
    subTitle: z.string().min(1),
    description: z.string().min(1),
    image: z.any().nullable(),
})

type NewsFormValues = z.infer<typeof newsSchema>

export default function NewsPosting() {
    const [loading, setLoading] = useState(false)

    const form = useForm<NewsFormValues>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            description: "",
            image: null,
        },
    })

    const modules = useMemo(() => ({
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    }), [])

    const formats = useMemo(() => [
        "header", "bold", "italic", "underline", "list", "bullet", "link", "image",
    ], [])

    const onSubmit = async (values: NewsFormValues) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("subTitle", values.subTitle)
        formData.append("description", values.description)
        if (values.image) formData.append("image", values.image)

        try {
            setLoading(true)
            const res = await createNews(formData)
            toast.success(res.message)
            form.reset()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to create newsletter")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">News</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border p-6 rounded-md">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Title" {...field} />
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
                                <FormLabel>Subheading</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Property Name" {...field} />
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Write About Property"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Upload Image */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Image</FormLabel>
                                <FormControl>
                                    <FileUploader
                                        onFileSelected={(file: File) => field.onChange(file)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-black text-white" disabled={loading}>
                        {loading ? "Posting..." : "Post News"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
