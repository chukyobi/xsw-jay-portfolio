"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTechnology, updateTechnology, deleteTechnology } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Technology } from "@/lib/types"

interface TechnologyFormProps {
  technology?: Technology
  isEditing?: boolean
}

// Common technology categories
const categories = ["languages", "frontend", "backend", "databases", "devops", "mobile", "tools", "other"]

export function TechnologyForm({ technology, isEditing = false }: TechnologyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<Omit<Technology, "id" | "created_at" | "updated_at">>({
    name: technology?.name || "",
    category: technology?.category || "languages",
    icon: technology?.icon || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && technology) {
        await updateTechnology(technology.id, formData)
        toast({
          title: "Technology updated",
          description: "Your technology has been updated successfully",
        })
      } else {
        await createTechnology(formData)
        toast({
          title: "Technology created",
          description: "Your technology has been created successfully",
        })
      }
      router.push("/admin/dashboard?tab=technologies")
      router.refresh()
    } catch (error) {
      console.error("Error saving technology:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save technology",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!technology) return

    if (!confirm("Are you sure you want to delete this technology? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteTechnology(technology.id)
      toast({
        title: "Technology deleted",
        description: "Your technology has been deleted successfully",
      })
      router.push("/admin/dashboard?tab=technologies")
      router.refresh()
    } catch (error) {
      console.error("Error deleting technology:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete technology",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Technology" : "Add New Technology"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your technology" : "Add a new technology to your portfolio"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Technology Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon URL</Label>
            <Input
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="https://example.com/icon.png"
            />
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
              {isLoading ? "Saving..." : isEditing ? "Update Technology" : "Create Technology"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
