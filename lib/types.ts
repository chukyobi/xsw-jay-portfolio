export type Project = {
  id: string
  title: string
  description: string
  long_description?: string
  thumbnail_url?: string
  github_url?: string
  live_url?: string
  technologies: string[]
  category?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export type Experience = {
  id: string
  company: string
  position: string
  description?: string
  start_date: string
  end_date?: string | null
  is_current?: boolean
  created_at?: string
  updated_at?: string
}

export type Education = {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  description?: string
  start_date: string
  end_date?: string | null
  is_current?: boolean
  created_at?: string
  updated_at?: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon?: string
  created_at?: string
  updated_at?: string
}

export type Technology = {
  id: string
  name: string
  category: string
  icon?: string
  created_at?: string
  updated_at?: string
}

export type Company = {
  id: string
  name: string
  logo_url?: string
  created_at?: string
  updated_at?: string
}

export type Testimonial = {
  id: string
  name: string
  position?: string
  company?: string
  content: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}
