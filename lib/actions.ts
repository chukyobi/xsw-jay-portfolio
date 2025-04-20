"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import type { Project, Experience, Education, Service, Technology, Company, Testimonial } from "@/lib/types"
import { revalidatePath } from "next/cache"

// Projects CRUD
export async function getProjects(limit = 3) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
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
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all projects:", error)
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
) {
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
    }

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
