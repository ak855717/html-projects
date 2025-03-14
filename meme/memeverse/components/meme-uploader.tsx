"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { addUserMeme } from "@/lib/features/memes-slice"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import type { Meme } from "@/types/meme"
import { Upload, ImageIcon, Sparkles, X } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export function MemeUploader() {
  const router = useRouter()
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [title, setTitle] = useState("")
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, GIF)")
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, GIF)")
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const generateAICaption = () => {
    setIsGeneratingCaption(true)

    // Simulate AI caption generation
    setTimeout(() => {
      const captions = [
        "When you finally find the bug in your code after 5 hours",
        "That moment when you realize it's only Tuesday",
        "Me explaining to my mom why I need a new gaming PC",
        "When someone says they'll be there in 5 minutes",
        "How I look waiting for my code to compile",
      ]

      const randomCaption = captions[Math.floor(Math.random() * captions.length)]
      setCaption(randomCaption)
      setIsGeneratingCaption(false)
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile || !title) {
      alert("Please select an image and add a title")
      return
    }

    setIsUploading(true)

    try {
      // In a real app, you would upload the file to a server
      // For this demo, we'll simulate an upload and use the local file

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newMeme: Meme = {
        id: uuidv4(),
        name: title,
        url: previewUrl || "",
        width: 500,
        height: 500,
        caption: caption,
        likes: 0,
        comments: 0,
        category: "New",
        createdAt: new Date().toISOString(),
        userId: "current-user",
        userName: "You",
      }

      dispatch(addUserMeme(newMeme))

      // Navigate to the meme details page
      router.push(`/meme/${newMeme.id}`)
    } catch (error) {
      console.error("Error uploading meme:", error)
      alert("Failed to upload meme. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="template">Use Template</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meme Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a catchy title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caption">Caption (Optional)</Label>
                  <div className="flex gap-2">
                    <Textarea
                      id="caption"
                      placeholder="Add a funny caption..."
                      className="min-h-[100px]"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={generateAICaption}
                    disabled={isGeneratingCaption}
                  >
                    {isGeneratingCaption ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate AI Caption
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label>Upload Image</Label>
                <div
                  className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center ${
                    previewUrl ? "border-primary" : "border-muted-foreground"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {previewUrl ? (
                    <div className="relative">
                      <div className="relative aspect-square w-full overflow-hidden rounded-md">
                        <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                        onClick={clearSelectedFile}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center py-4 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium mb-1">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground">Supports JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  clearSelectedFile()
                  setTitle("")
                  setCaption("")
                }}
              >
                Reset
              </Button>
              <Button type="submit" disabled={!selectedFile || isUploading}>
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Meme
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="template" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Template selection feature coming soon! For now, please upload your own image.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Tips for Great Memes</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="rounded-full bg-primary/10 p-1 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Keep it simple and relatable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="rounded-full bg-primary/10 p-1 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Use high-quality images for better visibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="rounded-full bg-primary/10 p-1 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Try our AI caption generator for inspiration</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="rounded-full bg-primary/10 p-1 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Be original and creative to stand out</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

