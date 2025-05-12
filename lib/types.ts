import { ProjectStatus } from "./validations/project"

export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  thumbnail_url?: string
  github_url?: string
  live_url?: string
  technologies: string[]
  category?: string
  status: ProjectStatus
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
  start_date: string
  end_date: string | null
  is_current: boolean
  created_at: string
  updated_at: string
  location?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  description?: string
  start_date: string
  end_date?: string
  is_current: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface Technology {
  id: string
  name: string
  category: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  position?: string
  company?: string
  content: string
  avatar_url?: string
  created_at: string
  updated_at: string
  approved?: boolean
}

export interface User {
  id: string
  email: string
  name?: string
  role?: string
}

export interface AvatarOption {
  id: string
  url: string
  name: string
}
