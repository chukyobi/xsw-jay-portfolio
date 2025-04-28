"use client"

import { useEffect, useState } from "react"
import { CheckCircleIcon, StarIcon } from "lucide-react"
import { getExperience } from "@/lib/actions"
import type { Experience } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CompanyGroupedExperience {
  company: string
  roles: {
    id: string
    position: string
    description: string
    start_date: string
    end_date: string | null
    location?: string
    is_current: boolean
    is_highlight?: boolean
  }[]
}

const fallbackExperience: Experience[] = [
   {
    id: "1",
    company: "Soltec Engineering",
    position: "Software Engineer",
    description:
      "Leading the development of the company's academy platform using React, Node.js, and PostgreSQL. Hosted on AWS cloud infracsture, Implemented CI/CD pipelines and improved application performance by 40%.",
    start_date: "2025-01-08",
    end_date: null,
    is_current: true,
  },
  {
    id: "2",
    company: "National Bureau of Statistics",
    position: "Data Editor",
    description:
      "comprehensive data manipulation, editing, and refinement processes by utilizing survey solutions for the National Agricultural Sample Survey (NASS) sponsored by the World Bank. Collaborated with the software engineering team to implement real-time updates of pertinent statistical data to both their database and public website.",
    start_date: "2022-08-01",
    end_date: "2023-07-23",
    is_current: false,
  },
  {
    id: "3",
    company: "Urban10 Media",
    position: "Software Developer",
    description:
      "Built responsive user interfaces using React and implemented state management with Redux. Worked in an agile environment with daily stand-ups and sprint planning.",
    start_date: "2021-07-12",
    end_date: "2022-05-28",
    is_current: false,
  },
]

function groupByCompany(experience: Experience[]): CompanyGroupedExperience[] {
  const grouped: { [company: string]: CompanyGroupedExperience } = {}

  experience.forEach(item => {
    if (!grouped[item.company]) {
      grouped[item.company] = {
        company: item.company,
        roles: [],
      }
    }

    grouped[item.company].roles.push({
      id: item.id,
      position: item.position,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date,
      location: "Bangalore, India", // you can customize based on your schema
      is_current: item.is_current,
      is_highlight: item.position.includes("Senior"),
    })
  })

  return Object.values(grouped)
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

function calculateDuration(start: string, end: string | null) {
  const startDate = new Date(start)
  const endDate = end ? new Date(end) : new Date()

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                 (endDate.getMonth() - startDate.getMonth())

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  const yearStr = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : ""
  const monthStr = remainingMonths > 0 ? `${remainingMonths} m` : ""

  return [yearStr, monthStr].filter(Boolean).join(", ")
}

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await getExperience()
        if (expData.length > 0) setExperience(expData)
      } catch (error) {
        console.error("Error fetching experience:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const groupedExperience = groupByCompany(experience.length ? experience : fallbackExperience)

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>

        <div className="relative border-l border-border pl-12">
          {groupedExperience.map(company => (
            <div key={company.company} className="mb-12 relative">
              <div className="flex items-center mb-4">
                {/* Replace with logo if you have */}
                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center mr-4 text-primary font-bold">
                  {company.company[0]}
                </div>
                <h3 className="text-xl font-bold">{company.company}</h3>
              </div>

              {company.roles.map((role, index) => (
                <div key={role.id} className="relative pl-10 mb-6 group">
                  <div className="absolute left-0 top-2.5 h-2 w-2 rounded-full bg-primary group-last:hidden" />

                  <Card className="bg-background border-none shadow-none">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{role.position}</h4>
                        {role.is_current && (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        )}
                        {role.is_highlight && (
                          <StarIcon className="h-4 w-4 text-orange-400" />
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground mb-1">
                        {formatDate(role.start_date)} - {formatDate(role.end_date)} 
                        {" "}
                        ({calculateDuration(role.start_date, role.end_date)})
                        {" "}• {role.location} • Full-Time
                      </div>

                      <p className="text-muted-foreground text-sm">{role.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
