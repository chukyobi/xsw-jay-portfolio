"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import type { Project, Experience, Education, Service, Technology, Company, Testimonial } from "@/lib/types"

export async function getProjects() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data as Project[]
}

export async function getExperience() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("experience").select("*").order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching experience:", error)
    return []
  }

  return data as Experience[]
}

export async function getEducation() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("education").select("*").order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching education:", error)
    return []
  }

  return data as Education[]
}

export async function getServices() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("services").select("*")

  if (error) {
    console.error("Error fetching services:", error)
    return []
  }

  return data as Service[]
}

export async function getTechnologies() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("technologies").select("*")

  if (error) {
    console.error("Error fetching technologies:", error)
    return []
  }

  return data as Technology[]
}

export async function getCompanies() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("companies").select("*")

  if (error) {
    console.error("Error fetching companies:", error)
    return []
  }

  return data as Company[]
}

export async function getTestimonials() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("testimonials").select("*")

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data as Testimonial[]
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

// Sample project data to use when database is empty or for testing
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    long_description:
      "This project is a comprehensive e-commerce solution built with React, Node.js, and MongoDB. It features a responsive design, user authentication, product catalog, shopping cart, checkout process with Stripe integration, and an admin dashboard for managing products and orders.",
    thumbnail_url: "/placeholder.svg?height=400&width=600",
    github_url: "https://github.com",
    live_url: "https://example.com",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    long_description:
      "This task management application helps teams organize and track their work efficiently. Built with React and Firebase, it offers real-time updates, task assignment, due dates, priority levels, comments, file attachments, and progress tracking. The app includes both personal and team workspaces.",
    thumbnail_url: "/placeholder.svg?height=400&width=600",
    github_url: "https://github.com",
    live_url: "https://example.com",
    technologies: ["React", "Firebase", "Material UI", "Redux"],
  },
  {
    id: "3",
    title: "Fitness Tracker Mobile App",
    description: "A cross-platform mobile application for tracking workouts and fitness progress.",
    long_description:
      "This fitness tracking app helps users monitor their workout routines and overall fitness progress. Developed with React Native and Expo, it works on both iOS and Android devices. Features include workout logging, progress charts, calorie tracking, custom workout plans, and social sharing capabilities.",
    thumbnail_url: "/placeholder.svg?height=400&width=600",
    github_url: "https://github.com",
    live_url: "https://example.com",
    technologies: ["React Native", "Expo", "Firebase", "Redux"],
  },
]

export async function getProjectById(id: string) {
  try {
    // First, try to get all projects from the database
    const supabase = createServerSupabaseClient()
    const { data: dbProjects, error } = await supabase.from("projects").select("*")

    // If there's an error or no projects in the database, use sample data
    const projects = error || !dbProjects || dbProjects.length === 0 ? sampleProjects : dbProjects

    // If the ID is numeric, use it as an index (1-based)
    if (/^\d+$/.test(id)) {
      const numericId = Number.parseInt(id, 10)
      const index = numericId - 1 // Convert to 0-based index

      if (index >= 0 && index < projects.length) {
        return projects[index] as Project
      }
    }

    // If not numeric or index out of bounds, try to find by UUID
    const project = projects.find((p) => p.id === id)
    if (project) {
      return project as Project
    }

    // If no project found, return null
    return null
  } catch (error) {
    console.error(`Error in getProjectById for id ${id}:`, error)
    return null
  }
}
