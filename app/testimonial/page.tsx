"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitTestimonial } from "@/lib/actions"
import type { AvatarOption } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

// Default avatar options
const avatarOptions: AvatarOption[] = [
  { id: "avatar1", url: "/placeholder.svg?height=100&width=100", name: "Default 1" },
  { id: "avatar2", url: "/placeholder.svg?height=100&width=100", name: "Default 2" },
  { id: "avatar3", url: "/placeholder.svg?height=100&width=100", name: "Default 3" },
  { id: "avatar4", url: "/placeholder.svg?height=100&width=100", name: "Default 4" },
  { id: "avatar5", url: "/placeholder.svg?height=100&width=100", name: "Default 5" },
]

export default function TestimonialPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    content: "",
    avatar_url: avatarOptions[0].url,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar_url: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitTestimonial(formData)
      setSubmitted(true)
      toast({
        title: "Testimonial Submitted",
        description: "Thank you for your feedback! Your testimonial will be reviewed shortly.",
      })
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your testimonial. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-20 px-4 mt-16">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Share Your Testimonial</CardTitle>
              <CardDescription>
                I appreciate your feedback! Please share your experience working with me.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your testimonial has been submitted and will be reviewed shortly.
                  </p>
                  <Button onClick={() => router.push("/")}>Return to Homepage</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Senior Developer"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Your Testimonial *</Label>
                      <Textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        placeholder="Share your experience working with me..."
                        rows={5}
                      />
                    </div>

                    <div>
                      <Label>Choose an Avatar</Label>
                      <RadioGroup
                        defaultValue={avatarOptions[0].url}
                        className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-2"
                      >
                        {avatarOptions.map((avatar) => (
                          <div key={avatar.id} className="flex flex-col items-center space-y-2">
                            <RadioGroupItem
                              value={avatar.url}
                              id={avatar.id}
                              className="sr-only"
                              onClick={() => handleAvatarSelect(avatar.url)}
                            />
                            <Label htmlFor={avatar.id} className="cursor-pointer flex flex-col items-center space-y-2">
                              <div
                                className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                                  formData.avatar_url === avatar.url
                                    ? "border-blue-accent scale-110"
                                    : "border-transparent hover:border-muted"
                                }`}
                              >
                                <Image
                                  src={avatar.url || "/placeholder.svg"}
                                  alt={avatar.name}
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs">{avatar.name}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
