"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import dynamic from "next/dynamic"
import { postNews } from "@/lib/api" // ✅ import your API util
import { toast } from "sonner" // optional toast for better feedback

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function NewsPage() {
    const [title, setTitle] = useState("")
    const [subheading, setSubheading] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await postNews(title, `<h2>${subheading}</h2>${description}`)
            toast.success("Newsletter sent successfully!")
            setTitle("")
            setSubheading("")
            setDescription("")
        } catch (error: any) {
            console.error("Newsletter Error:", error)
            toast.error(error.message || "Failed to send newsletter")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-3xl font-bold">Post News</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="Enter newsletter subject"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Subheading */}
                <div>
                    <Label htmlFor="subheading">Subheading</Label>
                    <Input
                        id="subheading"
                        placeholder="Enter subheading"
                        value={subheading}
                        onChange={(e) => setSubheading(e.target.value)}
                        required
                    />
                </div>

                {/* Rich Text Editor */}
                <div>
                    <Label htmlFor="description">Content</Label>
                    <div className="mt-2">
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            placeholder="Write your newsletter content here..."
                            style={{ height: "200px", marginBottom: "50px" }}
                        />
                    </div>
                </div>

                {/* Optional Image Upload UI (no functionality yet) */}
                <div>
                    <Label>Upload Image (optional)</Label>
                    <Card className="mt-2">
                        <CardContent className="flex flex-col items-center justify-center p-12 bg-gray-100 text-gray-600">
                            <Upload className="h-12 w-12 mb-4" />
                            <p className="mb-4">Drop your files here or click below</p>
                            <Button variant="secondary" type="button">
                                Choose File
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
                    {loading ? "Sending..." : "Post News"}
                </Button>
            </form>
        </div>
    )
}
