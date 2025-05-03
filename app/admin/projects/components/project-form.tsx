"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Upload, X, Check, ImageIcon, FileText, AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createProject, updateProject, deleteProject } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Project } from "@/lib/types"

interface ProjectFormProps {
  project?: Project
  isEditing?: boolean
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState<Omit<Project, "id" | "created_at" | "updated_at">>({
    title: project?.title || "",
    description: project?.description || "",
    long_description: project?.long_description || "",
    thumbnail_url: project?.thumbnail_url || "",
    github_url: project?.github_url || "",
    live_url: project?.live_url || "",
    technologies: project?.technologies || [],
    category: project?.category || "",
    status: project?.status || "published",
  })

  // Set preview URL if thumbnail exists
  useEffect(() => {
    if (formData.thumbnail_url) {
      setPreviewUrl(formData.thumbnail_url)
    }
  }, [formData.thumbnail_url])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(",").map((tech) => tech.trim())
    setFormData((prev) => ({ ...prev, technologies }))
  }

  // Simulated progress for better UX
  const simulateProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 5
      })
    }, 100)
    return interval
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError(`File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`)
      return
    }

    setIsDragging(false)
    setUploadError(null)

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    const formDataUpload = new FormData()
    formDataUpload.append("file", file)

    // Start progress simulation
    const progressInterval = simulateProgress()

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      })

      const data = await res.json()

      if (res.ok) {
        // Complete progress to 100%
        setUploadProgress(100)
        setTimeout(() => setUploadProgress(null), 1000)

        setFormData((prev) => ({ ...prev, thumbnail_url: data.url }))
        toast({
          title: "Upload Successful",
          description: "File uploaded to S3",
        })
      } else {
        setUploadError(data.error || "Upload failed")
        setPreviewUrl(null)
        toast({
          title: "Upload Failed",
          description: data.error || "Unknown error",
          variant: "destructive",
        })
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed")
      setPreviewUrl(null)
      toast({
        title: "Upload Error",
        description: String(err),
        variant: "destructive",
      })
    } finally {
      clearInterval(progressInterval)
      if (uploadProgress !== 100) {
        setUploadProgress(null)
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: false,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && project) {
        await updateProject(project.id, formData)
        toast({
          title: "Project updated",
          description: "Your project has been updated successfully",
        })
      } else {
        await createProject(formData)
        toast({
          title: "Project created",
          description: "Your project has been created successfully",
        })
      }
      router.push("/admin/dashboard?tab=projects")
      router.refresh()
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save project",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!project) return
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return

    setIsDeleting(true)

    try {
      await deleteProject(project.id)
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully",
      })
      router.push("/admin/dashboard?tab=projects")
      router.refresh()
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete project",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const clearFile = () => {
    setPreviewUrl(null)
    setFormData((prev) => ({ ...prev, thumbnail_url: "" }))
  }

  const getFileTypeIcon = () => {
    if (!previewUrl) return <Upload className="h-10 w-10 text-muted-foreground" />

    if (previewUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return <ImageIcon className="h-6 w-6 text-muted-foreground" />
    }

    return <FileText className="h-6 w-6 text-muted-foreground" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your project details" : "Add a new project to your portfolio"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Project Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="A brief description of your project"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="long_description">Long Description</Label>
            <Textarea
              id="long_description"
              name="long_description"
              value={formData.long_description}
              onChange={handleChange}
              placeholder="A detailed description of your project"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Thumbnail / File</Label>
            <div className="relative">
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
                  isDragging || isDragActive
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : uploadError
                      ? "border-red-300 bg-red-50 dark:bg-red-950/20"
                      : "border-muted hover:bg-muted/5"
                }`}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  {previewUrl ? (
                    <div className="flex flex-col items-center">
                      {previewUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                        <div className="relative w-32 h-32 mb-2 overflow-hidden rounded-md border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        getFileTypeIcon()
                      )}
                      <p className="text-sm font-medium">
                        {formData.thumbnail_url?.split("/").pop() || "Selected file"}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          clearFile()
                        }}
                      >
                        <X className="h-4 w-4 mr-1" /> Remove file
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-full bg-muted/80 p-3">{getFileTypeIcon()}</div>
                      <div>
                        <p className="font-medium text-sm">
                          <span className="text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Images or PDF (max 10MB)</p>
                      </div>
                    </>
                  )}

                  {uploadError && (
                    <div className="flex items-center text-red-500 mt-2">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">{uploadError}</span>
                    </div>
                  )}
                </div>
              </div>

              {uploadProgress !== null && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                      <div
                        className="flex flex-col justify-center rounded bg-green-500 transition-all duration-300 ease-in-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    {uploadProgress === 100 && (
                      <div className="absolute right-0 -top-1 text-green-500">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                name="live_url"
                value={formData.live_url}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies *</Label>
            <Input
              id="technologies"
              name="technologies"
              value={formData.technologies.join(", ")}
              onChange={handleTechnologiesChange}
              required
              placeholder="React, Node.js, MongoDB"
            />
            <p className="text-sm text-muted-foreground">Comma-separated list</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Web Development"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="published"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {isEditing && (
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
