"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { approveTestimonial, deleteTestimonial } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CheckIcon, XIcon, Trash2Icon } from "lucide-react"
import type { Testimonial } from "@/lib/types"

interface TestimonialActionsProps {
  testimonial: Testimonial
  isApproved?: boolean
}

export function TestimonialActions({ testimonial, isApproved = false }: TestimonialActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleApprove = async (approved: boolean) => {
    setIsLoading(true)

    try {
      await approveTestimonial(testimonial.id, approved)
      toast({
        title: approved ? "Testimonial Approved" : "Testimonial Rejected",
        description: approved ? "The testimonial is now visible on the website" : "The testimonial has been rejected",
      })
      router.refresh()
    } catch (error) {
      console.error("Error updating testimonial:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update testimonial status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteTestimonial(testimonial.id)
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been deleted successfully",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete testimonial",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isApproved) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500"
          onClick={() => handleApprove(false)}
          disabled={isLoading}
        >
          <XIcon className="h-4 w-4 mr-1" />
          Revoke Approval
        </Button>
        <Button variant="outline" size="sm" className="text-red-500" onClick={handleDelete} disabled={isDeleting}>
          <Trash2Icon className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </>
    )
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-red-500"
        onClick={() => handleApprove(false)}
        disabled={isLoading}
      >
        <XIcon className="h-4 w-4 mr-1" />
        Reject
      </Button>
      <Button
        size="sm"
        className="bg-green-500 hover:bg-green-600"
        onClick={() => handleApprove(true)}
        disabled={isLoading}
      >
        <CheckIcon className="h-4 w-4 mr-1" />
        Approve
      </Button>
    </>
  )
}
