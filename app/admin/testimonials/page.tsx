import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTestimonials } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { ArrowLeftIcon } from "lucide-react"
import { TestimonialActions } from "./components/testimonial-actions"

export default async function TestimonialsAdminPage() {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  // Get all testimonials
  const testimonials = await getTestimonials(false)

  // Filter testimonials
  const pendingTestimonials = testimonials.filter((t) => t.approved === false)
  const approvedTestimonials = testimonials.filter((t) => t.approved === true || t.approved === undefined)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="mb-8">
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingTestimonials.length > 0 && (
                <Badge className="ml-2 bg-yellow-highlight text-background">{pendingTestimonials.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              {approvedTestimonials.length > 0 && <Badge className="ml-2">{approvedTestimonials.length}</Badge>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingTestimonials.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending testimonials to review</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50 pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar_url || "/placeholder.svg?height=48&width=48"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>
                              {testimonial.position}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-highlight/10 text-yellow-highlight border-yellow-highlight/20"
                        >
                          Pending
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex justify-end gap-2">
                        <TestimonialActions testimonial={testimonial} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedTestimonials.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No approved testimonials yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {approvedTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50 pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar_url || "/placeholder.svg?height=48&width=48"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>
                              {testimonial.position}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Approved
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex justify-end">
                        <TestimonialActions testimonial={testimonial} isApproved />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
