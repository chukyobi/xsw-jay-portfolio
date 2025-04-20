import { getTestimonials } from "@/lib/actions"
import { TestimonialsDisplay } from "./testimonials-display"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function TestimonialsSection() {
  try {
    // Fetch data in server component
    const testimonials = await getTestimonials(true)

    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        {/* Gradient shadows */}
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-blue-accent/30 to-purple-accent/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-tl from-yellow-highlight/30 to-green-500/30 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">What people say about working with me</p>
          </div>

          {/* Pass data to client component */}
          <TestimonialsDisplay testimonials={testimonials} />
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching testimonials data:", error)
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">What people say about working with me</p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Failed to load testimonials. Please try again later.</p>
            <Button asChild>
              <Link href="/testimonial">Submit a Testimonial</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }
}
