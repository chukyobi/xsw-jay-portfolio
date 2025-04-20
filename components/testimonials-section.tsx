import { getTestimonials } from "@/lib/actions"
import { TestimonialsDisplay } from "./testimonials-display"

export async function TestimonialsSection() {
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
}
