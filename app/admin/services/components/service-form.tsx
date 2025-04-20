"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createService, updateService, deleteService } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Service } from "@/lib/types"

interface ServiceFormProps {
  service?: Service
  isEditing?: boolean
}

export function ServiceForm({ service, isEditing = false }: ServiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<Omit<Service, "id" | "created_at" | "updated_at">>({
    title: service?.title || "",
    description: service?.description || "",
    icon: service?.icon || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && service) {
        await updateService(service.id, formData)
        toast({
          title: "Service updated",
          description: "Your service has been updated successfully",
        })
      } else {
        await createService(formData)
        toast({
          title: "Service created",
          description: "Your service has been created successfully",
        })
      }
      router.push("/admin/dashboard?tab=services")
      router.refresh()
    } catch (error) {
      console.error("Error saving service:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save service",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!service) return

    if (!confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteService(service.id)
      toast({
        title: "Service deleted",
        description: "Your service has been deleted successfully",
      })
      router.push("/admin/dashboard?tab=services")
      router.refresh()
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete service",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Service" : "Add New Service"}</CardTitle>
        <CardDescription>{isEditing ? "Update your service" : "Add a new service to your portfolio"}</CardDescription>
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
              placeholder="Service Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the service you offer"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon name or URL" />
            <p className="text-sm text-muted-foreground">Enter a Lucide icon name (e.g., "code") or an image URL</p>
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
              {isLoading ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
