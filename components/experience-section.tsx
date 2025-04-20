"use client"
import { getExperience } from "@/lib/actions"
import { ExperienceDisplay } from "./experience-display"

export async function ExperienceSection() {
  // Fetch data in server component
  try {
    const experiences = await getExperience()

    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">My professional journey and roles</p>
          </div>

          {/* Pass data to client component */}
          <ExperienceDisplay experiences={experiences} />
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching experience data:", error)
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">My professional journey and roles</p>
          </div>
          <div className="text-center">
            <p>Failed to load experience data. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }
}
