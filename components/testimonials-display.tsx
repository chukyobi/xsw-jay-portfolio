"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Testimonial } from "@/lib/types"

export function TestimonialsDisplay({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="relative">
      {/* Decorative avatar placeholders in a curved arrangement */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-16 left-1/4 transform -translate-x-1/2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-accent to-purple-accent opacity-20"></div>
        </div>
        <div className="absolute -top-8 left-1/3 transform -translate-x-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-highlight to-green-500 opacity-20"></div>
        </div>
        <div className="absolute top-1/4 -left-8 transform -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-accent to-blue-accent opacity-20"></div>
        </div>
        <div className="absolute top-3/4 -left-12 transform -translate-y-1/2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-yellow-highlight opacity-20"></div>
        </div>
        <div className="absolute -bottom-16 left-1/4 transform -translate-x-1/2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-accent to-purple-accent opacity-20"></div>
        </div>
        <div className="absolute -top-12 right-1/4 transform translate-x-1/2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-highlight to-green-500 opacity-20"></div>
        </div>
        <div className="absolute top-1/4 -right-8 transform -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-accent to-blue-accent opacity-20"></div>
        </div>
        <div className="absolute top-3/4 -right-12 transform -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-yellow-highlight opacity-20"></div>
        </div>
        <div className="absolute -bottom-16 right-1/4 transform translate-x-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-accent to-purple-accent opacity-20"></div>
        </div>
      </div>

      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6">No testimonials yet. Be the first to leave one!</p>
          <Button asChild>
            <Link href="/testimonial">Submit a Testimonial</Link>
          </Button>
        </div>
      )}

      <div className="text-center mt-12">
        <Button variant="outline" asChild>
          <Link href="/testimonial">Submit a Testimonial</Link>
        </Button>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar_url || "/placeholder.svg?height=48&width=48"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">
                {testimonial.position}
                {testimonial.company && ` at ${testimonial.company}`}
              </p>
            </div>
          </div>
          <p className="italic">"{testimonial.content}"</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
