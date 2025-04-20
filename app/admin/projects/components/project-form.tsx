"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(",").map((tech) => tech.trim())
    setFormData((prev) => ({ ...prev, technologies }))
  }

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

    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return
    }

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
            <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
            <Input
              id="thumbnail_url"
              name="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
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
            <p className="text-sm text-muted-foreground">Comma-separated list of technologies</p>
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
