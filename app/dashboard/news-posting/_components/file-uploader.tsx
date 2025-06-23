"use client"

import { UploadCloud } from "lucide-react"
import { useRef } from "react"

interface FileUploaderProps {
    onFileSelected: (file: File) => void
}

export function FileUploader({ onFileSelected }: FileUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelected(e.target.files[0])
        }
    }

    return (
        <div
            className="border border-dashed border-gray-400 rounded-md h-40 flex flex-col items-center justify-center text-center p-4 bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
        >
            <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
            <p className="text-gray-500">Drop your files here</p>
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
            />
            <button
                type="button"
                className="mt-2 text-white bg-black px-4 py-1 rounded"
                onClick={() => fileInputRef.current?.click()}
            >
                Choose File
            </button>
        </div>
    )
}
