"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createExperience, updateExperience, deleteExperience } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Experience } from "@/lib/types"

interface ExperienceFormProps {
  experience?: Experience
  isEditing?: boolean
}

export function ExperienceForm({ experience, isEditing = false }: ExperienceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<Omit<Experience, "id" | "created_at" | "updated_at">>({
    company: experience?.company || "",
    position: experience?.position || "",
    description: experience?.description || "",
    start_date: experience?.start_date || new Date().toISOString().split("T")[0],
    end_date: experience?.end_date || "",
    is_current: experience?.is_current || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_current: checked }))
    if (checked) {
      setFormData((prev) => ({ ...prev, end_date: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && experience) {
        await updateExperience(experience.id, formData)
        toast({
          title: "Experience updated",
          description: "Your experience has been updated successfully",
        })
      } else {
        await createExperience(formData)
        toast({
          title: "Experience created",
          description: "Your experience has been created successfully",
        })
      }
      router.push("/admin/dashboard?tab=experience")
      router.refresh()
    } catch (error) {
      console.error("Error saving experience:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save experience",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!experience) return

    if (!confirm("Are you sure you want to delete this experience? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteExperience(experience.id)
      toast({
        title: "Experience deleted",
        description: "Your experience has been deleted successfully",
      })
      router.push("/admin/dashboard?tab=experience")
      router.refresh()
    } catch (error) {
      console.error("Error deleting experience:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete experience",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Experience" : "Add New Experience"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your work experience" : "Add a new work experience to your portfolio"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Your Job Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                disabled={formData.is_current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="is_current" checked={formData.is_current} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="is_current">I currently work here</Label>
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
              {isLoading ? "Saving..." : isEditing ? "Update Experience" : "Create Experience"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
