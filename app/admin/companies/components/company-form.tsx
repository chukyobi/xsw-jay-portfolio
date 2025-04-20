"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCompany, updateCompany, deleteCompany } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Company } from "@/lib/types"

interface CompanyFormProps {
  company?: Company
  isEditing?: boolean
}

export function CompanyForm({ company, isEditing = false }: CompanyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<Omit<Company, "id" | "created_at" | "updated_at">>({
    name: company?.name || "",
    logo_url: company?.logo_url || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && company) {
        await updateCompany(company.id, formData)
        toast({
          title: "Company updated",
          description: "Your company has been updated successfully",
        })
      } else {
        await createCompany(formData)
        toast({
          title: "Company created",
          description: "Your company has been created successfully",
        })
      }
      router.push("/admin/dashboard?tab=companies")
      router.refresh()
    } catch (error) {
      console.error("Error saving company:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save company",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!company) return

    if (!confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteCompany(company.id)
      toast({
        title: "Company deleted",
        description: "Your company has been deleted successfully",
      })
      router.push("/admin/dashboard?tab=companies")
      router.refresh()
    } catch (error) {
      console.error("Error deleting company:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete company",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Company" : "Add New Company"}</CardTitle>
        <CardDescription>{isEditing ? "Update your company" : "Add a new company to your portfolio"}</CardDescription>
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
              placeholder="Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
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
              {isLoading ? "Saving..." : isEditing ? "Update Company" : "Create Company"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
