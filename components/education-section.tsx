"use client"
import { getEducation } from "@/lib/actions"
import { EducationDisplay } from "./education-display"

export async function EducationSection() {
  try {
    // Fetch data in server component
    const education = await getEducation()

    return (
      <section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">My academic background and qualifications</p>
          </div>

          {/* Pass data to client component */}
          <EducationDisplay education={education} />
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching education data:", error)
    return (
      <section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">My academic background and qualifications</p>
          </div>
          <div className="text-center">
            <p>Failed to load education data. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }
}
