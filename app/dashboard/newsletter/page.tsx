"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { postNews } from "@/lib/api"
import { toast } from "sonner"
import dynamic from "next/dynamic"

// Dynamic import with proper error handling for react-quill 2.0.0
const ReactQuill = dynamic(
    () => import("react-quill").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <div className="h-[200px] bg-gray-100 animate-pulse rounded border"></div>
    }
)

// Import Quill CSS normally - this is fine for client components
import "react-quill/dist/quill.snow.css"

export default function NewsPage() {
    const [title, setTitle] = useState("")
    const [subheading, setSubheading] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)



    const modules = useMemo(() => ({
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
    }), [])

    const formats = useMemo(() => [
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
    ], [])

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
        <div className="space-y-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold">Send Newsletter</h1>
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
                <div className="mb-2">
                    <Label htmlFor="description">Content</Label>
                    <div className="mt-2 rounded">
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                            formats={formats}
                            placeholder="Write your newsletter content here..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 mt-0"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Post News"}
                </Button>
            </form>
        </div>
    )
}