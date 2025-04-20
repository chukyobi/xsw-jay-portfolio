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
import { createEducation, updateEducation, deleteEducation } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Education } from "@/lib/types"

interface EducationFormProps {
  education?: Education
  isEditing?: boolean
}

export function EducationForm({ education, isEditing = false }: EducationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<Omit<Education, "id" | "created_at" | "updated_at">>({
    institution: education?.institution || "",
    degree: education?.degree || "",
    field_of_study: education?.field_of_study || "",
    description: education?.description || "",
    start_date: education?.start_date || new Date().toISOString().split("T")[0],
    end_date: education?.end_date || "",
    is_current: education?.is_current || false,
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
      if (isEditing && education) {
        await updateEducation(education.id, formData)
        toast({
          title: "Education updated",
          description: "Your education has been updated successfully",
        })
      } else {
        await createEducation(formData)
        toast({
          title: "Education created",
          description: "Your education has been created successfully",
        })
      }
      router.push("/admin/dashboard?tab=education")
      router.refresh()
    } catch (error) {
      console.error("Error saving education:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save education",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!education) return

    if (!confirm("Are you sure you want to delete this education? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteEducation(education.id)
      toast({
        title: "Education deleted",
        description: "Your education has been deleted successfully",
      })
      router.push("/admin/dashboard?tab=education")
      router.refresh()
    } catch (error) {
      console.error("Error deleting education:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete education",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Education" : "Add New Education"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your education" : "Add a new education to your portfolio"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution *</Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              placeholder="University or School Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Degree *</Label>
            <Input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              placeholder="Bachelor of Science, Master's, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="field_of_study">Field of Study</Label>
            <Input
              id="field_of_study"
              name="field_of_study"
              value={formData.field_of_study}
              onChange={handleChange}
              placeholder="Computer Science, Business, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your studies, achievements, and activities"
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
            <Label htmlFor="is_current">I am currently studying here</Label>
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
              {isLoading ? "Saving..." : isEditing ? "Update Education" : "Create Education"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
