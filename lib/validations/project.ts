import * as z from "zod"


export const ProjectStatus = {
  DRAFT: 'draft' as const,
  PUBLISHED: 'published' as const,
} as const;


export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  long_description: z.string().optional().or(z.literal("")),
  thumbnail_url: z.string().optional().or(z.literal("")).or(z.undefined()),
  github_url: z.string().url("Invalid GitHub URL").optional().or(z.literal("")).or(z.undefined()),
  live_url: z.string().url("Invalid live URL").optional().or(z.literal("")).or(z.undefined()),
  technologies: z.array(z.string().min(1)).min(1, "At least one technology is required"),

  category: z.string().optional().or(z.literal("")).or(z.undefined()),
  status: z.enum([ProjectStatus.DRAFT, ProjectStatus.PUBLISHED]).default(ProjectStatus.PUBLISHED),
})


export type ProjectFormData = z.infer<typeof projectFormSchema>
