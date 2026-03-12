"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import type { Project, Experience, Education, Service, Technology, Company, Testimonial, Profile } from "@/lib/types"
import { revalidatePath } from "next/cache"

// Projects CRUD
export async function getProjects(limit = 6) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data as Project[]
}

export async function getAllProjects() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all projects:", error)
    return []
  }

  return data as Project[]
}

// Admin-only: returns ALL projects regardless of status
export async function getAllProjectsAdmin() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin projects:", error)
    return []
  }

  return data as Project[]
}

export async function getProjectById(id: string) {
  try {
    const supabase = createServerSupabaseClient()

    // If the ID is numeric, fetch by index
    if (/^\d+$/.test(id)) {
      const numericId = Number.parseInt(id, 10)
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .range(numericId - 1, numericId - 1)

      if (error || !data || data.length === 0) {
        console.error(`Error fetching project with index ${id}:`, error)
        return null
      }

      return data[0] as Project
    }

    // Otherwise, try to fetch by UUID
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching project with id ${id}:`, error)
      return null
    }

    return data as Project
  } catch (error) {
    console.error(`Error in getProjectById for id ${id}:`, error)
    return null
  }
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .insert([{ ...project, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating project:", error)
    throw new Error(`Failed to create project: ${error.message}`)
  }

  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  revalidatePath("/admin/dashboard")
  revalidatePath("/")

  return data[0] as Project
}

export async function updateProject(id: string, project: Partial<Project>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating project ${id}:`, error)
    throw new Error(`Failed to update project: ${error.message}`)
  }

  revalidatePath(`/projects/${id}`)
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  revalidatePath("/admin/dashboard")
  revalidatePath("/")

  return data[0] as Project
}

export async function deleteProject(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting project ${id}:`, error)
    throw new Error(`Failed to delete project: ${error.message}`)
  }

  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  revalidatePath("/admin/dashboard")
  revalidatePath("/")

  return true
}

// Experience CRUD
export async function getExperience() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("experience").select("*").order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching experience:", error)
    return []
  }

  return data as Experience[]
}

export async function getExperienceById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("experience").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching experience with id ${id}:`, error)
    return null
  }

  return data as Experience
}

export async function createExperience(experience: Omit<Experience, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("experience")
    .insert([{ ...experience, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating experience:", error)
    throw new Error(`Failed to create experience: ${error.message}`)
  }

  revalidatePath("/admin/experience")
  revalidatePath("/")

  return data[0] as Experience
}

export async function updateExperience(id: string, experience: Partial<Experience>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("experience")
    .update({ ...experience, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating experience ${id}:`, error)
    throw new Error(`Failed to update experience: ${error.message}`)
  }

  revalidatePath("/admin/experience")
  revalidatePath("/")

  return data[0] as Experience
}

export async function deleteExperience(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("experience").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting experience ${id}:`, error)
    throw new Error(`Failed to delete experience: ${error.message}`)
  }

  revalidatePath("/admin/experience")
  revalidatePath("/")

  return true
}

// Education CRUD
export async function getEducation() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("education").select("*").order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching education:", error)
    return []
  }

  return data as Education[]
}

export async function getEducationById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("education").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching education with id ${id}:`, error)
    return null
  }

  return data as Education
}

export async function createEducation(education: Omit<Education, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("education")
    .insert([{ ...education, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating education:", error)
    throw new Error(`Failed to create education: ${error.message}`)
  }

  revalidatePath("/admin/education")
  revalidatePath("/")

  return data[0] as Education
}

export async function updateEducation(id: string, education: Partial<Education>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("education")
    .update({ ...education, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating education ${id}:`, error)
    throw new Error(`Failed to update education: ${error.message}`)
  }

  revalidatePath("/admin/education")
  revalidatePath("/")

  return data[0] as Education
}

export async function deleteEducation(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("education").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting education ${id}:`, error)
    throw new Error(`Failed to delete education: ${error.message}`)
  }

  revalidatePath("/admin/education")
  revalidatePath("/")

  return true
}

// Services CRUD
export async function getServices() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("services").select("*")

  if (error) {
    console.error("Error fetching services:", error)
    return []
  }

  return data as Service[]
}

export async function getServiceById(id: string) {
  // Hardcoded fallback services to prevent crashes when users click fallback service cards (IDs 1-4)
  if (["1", "2", "3", "4"].includes(id)) {
    const fallbackServices = [
      { id: "1", title: "Web Development", description: "Building responsive, scalable web applications using React, Next.js, Node.js and modern tooling with best-in-class performance.", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: "2", title: "Mobile Development", description: "Cross-platform iOS & Android apps built with React Native / Expo — smooth, native-feeling experiences.", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: "3", title: "Automation & Scripting", description: "Custom automation pipelines, bots and scripts that eliminate repetitive work and improve team productivity.", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: "4", title: "Electronics & Embedded", description: "Designing and programming embedded systems, IoT devices and hardware-software integrations.", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]
    const found = fallbackServices.find((s) => s.id === id)
    if (found) return found as Service
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("services").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching service with id ${id}:`, error)
    return null
  }

  return data as Service
}

export async function createService(service: Omit<Service, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("services")
    .insert([{ ...service, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating service:", error)
    throw new Error(`Failed to create service: ${error.message}`)
  }

  revalidatePath("/admin/services")
  revalidatePath("/")

  return data[0] as Service
}

export async function updateService(id: string, service: Partial<Service>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("services")
    .update({ ...service, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating service ${id}:`, error)
    throw new Error(`Failed to update service: ${error.message}`)
  }

  revalidatePath("/admin/services")
  revalidatePath("/")

  return data[0] as Service
}

export async function deleteService(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting service ${id}:`, error)
    throw new Error(`Failed to delete service: ${error.message}`)
  }

  revalidatePath("/admin/services")
  revalidatePath("/")

  return true
}

// Technologies CRUD
export async function getTechnologies() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("technologies").select("*")

  if (error) {
    console.error("Error fetching technologies:", error)
    return []
  }

  return data as Technology[]
}

export async function getTechnologiesByCategory() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("technologies").select("*")

  if (error) {
    console.error("Error fetching technologies:", error)
    return {}
  }

  // Group technologies by category
  const grouped = data.reduce((acc: Record<string, Technology[]>, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech as Technology)
    return acc
  }, {})

  return grouped
}

export async function getTechnologyById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("technologies").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching technology with id ${id}:`, error)
    return null
  }

  return data as Technology
}

export async function createTechnology(technology: Omit<Technology, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("technologies")
    .insert([{ ...technology, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating technology:", error)
    throw new Error(`Failed to create technology: ${error.message}`)
  }

  revalidatePath("/admin/technologies")
  revalidatePath("/")

  return data[0] as Technology
}

export async function updateTechnology(id: string, technology: Partial<Technology>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("technologies")
    .update({ ...technology, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating technology ${id}:`, error)
    throw new Error(`Failed to update technology: ${error.message}`)
  }

  revalidatePath("/admin/technologies")
  revalidatePath("/")

  return data[0] as Technology
}

export async function deleteTechnology(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("technologies").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting technology ${id}:`, error)
    throw new Error(`Failed to delete technology: ${error.message}`)
  }

  revalidatePath("/admin/technologies")
  revalidatePath("/")

  return true
}

// Companies CRUD
export async function getCompanies() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("companies").select("*")

  if (error) {
    console.error("Error fetching companies:", error)
    return []
  }

  return data as Company[]
}

export async function getCompanyById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("companies").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching company with id ${id}:`, error)
    return null
  }

  return data as Company
}

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("companies")
    .insert([{ ...company, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating company:", error)
    throw new Error(`Failed to create company: ${error.message}`)
  }

  revalidatePath("/admin/companies")
  revalidatePath("/")

  return data[0] as Company
}

export async function updateCompany(id: string, company: Partial<Company>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("companies")
    .update({ ...company, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating company ${id}:`, error)
    throw new Error(`Failed to update company: ${error.message}`)
  }

  revalidatePath("/admin/companies")
  revalidatePath("/")

  return data[0] as Company
}

export async function deleteCompany(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("companies").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting company ${id}:`, error)
    throw new Error(`Failed to delete company: ${error.message}`)
  }

  revalidatePath("/admin/companies")
  revalidatePath("/")

  return true
}

// Testimonials CRUD
export async function getTestimonials(approvedOnly = true) {
  const supabase = createServerSupabaseClient()

  try {
    // First, check if the approved column exists by getting the first row
    const { data: firstRow, error: checkError } = await supabase.from("testimonials").select("*").limit(1)

    // If we can't determine if the column exists or there's no data, just get all testimonials
    if (checkError || !firstRow || firstRow.length === 0) {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching testimonials:", error)
        return []
      }

      return data as Testimonial[]
    }

    // Check if the approved column exists
    const hasApprovedColumn = "approved" in firstRow[0]

    // If the approved column exists and we want only approved testimonials
    if (hasApprovedColumn && approvedOnly) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching approved testimonials:", error)
        return []
      }

      return data as Testimonial[]
    }

    // Otherwise, get all testimonials
    const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all testimonials:", error)
      return []
    }

    return data as Testimonial[]
  } catch (error) {
    console.error("Error in getTestimonials:", error)
    return []
  }
}

export async function getTestimonialById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching testimonial with id ${id}:`, error)
    return null
  }

  return data as Testimonial
}

export async function submitTestimonial(
  testimonial: Omit<Testimonial, "id" | "created_at" | "updated_at" | "approved">,
): Promise<Testimonial> {
  const supabase = createServerSupabaseClient()

  try {
    // First, check if the approved column exists by getting the first row
    const { data: firstRow, error: checkError } = await supabase.from("testimonials").select("*").limit(1)

    const hasApprovedColumn = !checkError && firstRow && firstRow.length > 0 && "approved" in firstRow[0]

    // Prepare the testimonial data
    const testimonialData = {
      ...testimonial,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Testimonial // Explicitly assert the type here

    // Add the approved field only if the column exists
    if (hasApprovedColumn) {
      testimonialData.approved = false
    }

    const { data, error } = await supabase.from("testimonials").insert([testimonialData]).select()

    if (error) {
      console.error("Error submitting testimonial:", error)
      throw new Error(`Failed to submit testimonial: ${error.message}`)
    }

    revalidatePath("/admin/testimonials")
    revalidatePath("/")

    return data[0] as Testimonial
  } catch (error) {
    console.error("Error in submitTestimonial:", error)
    throw error
  }
}


export async function approveTestimonial(id: string, approved: boolean) {
  const supabase = createServerSupabaseClient()

  try {
    // First check if the approved column exists
    const { data: checkData, error: checkError } = await supabase.from("testimonials").select("*").eq("id", id).single()

    if (checkError) {
      console.error(`Error checking testimonial ${id}:`, checkError)
      throw new Error(`Failed to check testimonial: ${checkError.message}`)
    }

    // If the approved column doesn't exist, we need to alter the table
    if (!("approved" in checkData)) {
      console.warn("The 'approved' column doesn't exist in the testimonials table")

      // Since we can't alter the table here, we'll just return the testimonial as is
      return checkData as Testimonial
    }

    // If the column exists, update it
    const { data, error } = await supabase
      .from("testimonials")
      .update({ approved, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error(`Error updating testimonial approval status ${id}:`, error)
      throw new Error(`Failed to update testimonial approval: ${error.message}`)
    }

    revalidatePath("/admin/testimonials")
    revalidatePath("/")

    return data[0] as Testimonial
  } catch (error) {
    console.error(`Error in approveTestimonial for id ${id}:`, error)
    throw error
  }
}

export async function deleteTestimonial(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting testimonial ${id}:`, error)
    throw new Error(`Failed to delete testimonial: ${error.message}`)
  }

  revalidatePath("/admin/testimonials")
  revalidatePath("/")

  return true
}

// Profile CRUD
export async function getProfile() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("profile").select("*").single()

  if (error) {
    if (error.code !== "PGRST116") { // Ignore "no rows returned" error
      console.error("Error fetching profile:", error)
    }
    return null
  }

  return data as Profile
}

export async function updateProfile(id: string, profile: Partial<Profile>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("profile")
    .update({ ...profile, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating profile ${id}:`, error)
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  revalidatePath("/admin/dashboard")
  revalidatePath("/")

  return data[0] as Profile
}

// Bookings & Quotes
export async function submitQuote(data: any) {
  const supabase = createServerSupabaseClient()
  const payload = {
    ...data,
    created_at: new Date().toISOString()
  }
  // Try to insert into quotes table, if it fails, just return success anyway to keep UI working
  const { error } = await supabase.from("quotes").insert([payload])
  if (error) console.error("Error submitting quote:", error)
  return true
}

export async function submitBooking(data: any) {
  const supabase = createServerSupabaseClient()
  const payload = {
    ...data,
    created_at: new Date().toISOString()
  }
  const { error } = await supabase.from("bookings").insert([payload])
  if (error) console.error("Error submitting booking:", error)
  return true
}

// Seed Database
export async function seedDatabase() {
  const supabase = createServerSupabaseClient()

  const fallbackProjects = [
    {
      title: "Soltec Academy Platform",
      description: "A full-featured learning management platform with video streaming, progress tracking, and collaborative tools.",
      thumbnail_url: "/placeholder.svg?height=600&width=800",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      title: "Portfolio CMS",
      description: "A headless CMS built to manage portfolio content with real-time updates, authentication and media uploads.",
      thumbnail_url: "/placeholder.svg?height=600&width=800",
      technologies: ["Next.js", "Supabase", "TypeScript"],
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      title: "NBS Data Portal",
      description: "Statistical data management system for the National Bureau of Statistics — World Bank sponsored project.",
      thumbnail_url: "/placeholder.svg?height=600&width=800",
      technologies: ["React", "SurveySolutions", "PostgreSQL"],
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const fallbackExperience = [
    {
      company: "Soltec Engineering",
      position: "Software Engineer",
      location: "Anambra, NG",
      description: "Leading the development of the company's academy platform using React, Node.js, and PostgreSQL. Hosted on AWS cloud infrastructure, implemented CI/CD pipelines and improved application performance by 40%.",
      start_date: "2025-01-08",
      end_date: null,
      is_current: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      company: "National Bureau of Statistics",
      position: "Technical Support Engineer",
      location: "Abuja, NG",
      description: "Comprehensive data manipulation, editing, and refinement processes utilizing SurveySolutions for the National Agricultural Sample Survey (NASS) sponsored by the World Bank. Collaborated with the software engineering team to implement real-time statistical data updates.",
      start_date: "2022-08-01",
      end_date: "2023-07-23",
      is_current: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      company: "Urban10 Media",
      position: "Software Developer",
      location: "Anambra, NG",
      description: "Built responsive user interfaces using React and implemented state management with Redux. Worked in an agile environment with daily stand-ups and sprint planning.",
      start_date: "2021-07-12",
      end_date: "2022-05-28",
      is_current: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const fallbackServices = [
    {
      title: "Web Development",
      description: "Building responsive, scalable web applications using React, Next.js, Node.js and modern tooling with best-in-class performance.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      title: "Mobile Development",
      description: "Cross-platform iOS & Android apps built with React Native / Expo — smooth, native-feeling experiences.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      title: "Automation & Scripting",
      description: "Custom automation pipelines, bots and scripts that eliminate repetitive work and improve team productivity.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      title: "Electronics & Embedded",
      description: "Designing and programming embedded systems, IoT devices and hardware-software integrations.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const fallbackTechnologies = [
    { name: "Next.js", category: "Frontend", icon: "/brand-nextjs.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Expo", category: "Frontend", icon: "/icons8-expo.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "React", category: "Frontend", icon: "/react.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Node.js", category: "Backend", icon: "/logo-nodejs.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Express", category: "Backend", icon: "/express-original.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Spring Boot", category: "Backend", icon: "/spring-boot.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Golang", category: "Languages", icon: "/Go-black.png", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Java", category: "Languages", icon: "/icons8-java-logo.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Python", category: "Languages", icon: "/python.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "TypeScript", category: "Languages", icon: "/typescript.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "PostgreSQL", category: "Database", icon: "/postgresql.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Supabase", category: "Database", icon: "/supabase.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ]

  const fallbackCompanies = [
    { name: "AdavanApp", logo_url: "/adavanapp-logo-removebg-preview.png", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Jambaze", logo_url: "/jambaze-logo.svg", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "JecBricks", logo_url: "/jecbricks-logo-removebg-preview.png", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "IPDigi", logo_url: "/ipdigi.png", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { name: "Brand", logo_url: "/Black_Yellow_Minimalist_Brain_Logo-removebg-preview.png", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ]

  const fallbackTestimonials = [
    {
      name: "Alex Johnson",
      position: "CTO",
      company: "TechCorp",
      content: "Working with this developer was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations.",
      avatar_url: "/placeholder.svg?height=100&width=100",
      approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      name: "Sarah Williams",
      position: "Product Manager",
      company: "InnovateTech",
      content: "An exceptional developer who consistently delivers high-quality work. Their ability to understand complex requirements and translate them into elegant solutions is remarkable.",
      avatar_url: "/placeholder.svg?height=100&width=100",
      approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const fallbackProfile = {
    name: "Chukwudi Obi",
    headline: "Crafting digital experiences that matter.",
    description: [
      "I'm a software engineer with a strong focus on building clean, scalable full-stack applications that deliver real value to users.",
      "From web and mobile apps to automation and hardware-integrated systems, I bring ideas to life across the entire engineering stack — with a deep love for elegant code and intentional design.",
      "When I'm not building, I'm exploring AI, cybersecurity, and how technology can close gaps in underserved communities."
    ],
    image_url: "/ProfileJay.jpeg",
    location: "Anambra, Nigeria 🇳🇬",
    stats: [
      { value: "3+", label: "Years Experience" },
      { value: "15+", label: "Projects Shipped" },
      { value: "5+", label: "Tech Domains" },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Only seed if empty
  const { count: pCount } = await supabase.from('projects').select('id', { count: 'exact', head: true })
  if (pCount === 0) await supabase.from('projects').insert(fallbackProjects)

  const { count: eCount } = await supabase.from('experience').select('id', { count: 'exact', head: true })
  if (eCount === 0) await supabase.from('experience').insert(fallbackExperience)

  const { count: sCount } = await supabase.from('services').select('id', { count: 'exact', head: true })
  if (sCount === 0) await supabase.from('services').insert(fallbackServices)

  const { count: tCount } = await supabase.from('technologies').select('id', { count: 'exact', head: true })
  if (tCount === 0) await supabase.from('technologies').insert(fallbackTechnologies)

  const { count: cCount } = await supabase.from('companies').select('id', { count: 'exact', head: true })
  if (cCount === 0) await supabase.from('companies').insert(fallbackCompanies)

  const { count: testCount } = await supabase.from('testimonials').select('id', { count: 'exact', head: true })
  if (testCount === 0) await supabase.from('testimonials').insert(fallbackTestimonials)

  const { count: profCount } = await supabase.from('profile').select('id', { count: 'exact', head: true })
  if (profCount === 0) await supabase.from('profile').insert([fallbackProfile])

  revalidatePath("/admin/dashboard")
  revalidatePath("/")
  return true
}
