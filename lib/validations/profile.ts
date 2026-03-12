import { z } from "zod"

export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  headline: z.string().min(5, "Headline must be at least 5 characters"),
  description: z.array(z.string()).min(1, "At least one description paragraph is required"),
  image_url: z.string().url("Must be a valid URL"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).min(3, "At least 3 stats are required"),
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
