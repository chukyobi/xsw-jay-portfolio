import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import {
  FolderKanban,
  Briefcase,
  GraduationCap,
  Wrench,
  Code,
  Building,
  MessageSquare,
  PlusCircle,
  Users,
} from "lucide-react"
import {
  getAllProjectsAdmin,
  getExperience,
  getEducation,
  getServices,
  getCompanies,
  getTestimonials,
  getProfile,
  getTechnologies,
  seedDatabase,
} from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { DashboardTabs } from "./components/dashboard-tabs"

export default async function AdminDashboardPage() {
  await requireAdmin()

  const [projects, experience, education, services, technologies, companies, testimonials, profile] = await Promise.all([
    getAllProjectsAdmin(),
    getExperience(),
    getEducation(),
    getServices(),
    getTechnologies(),
    getCompanies(),
    getTestimonials(false),
    getProfile(),
  ])

  const pendingTestimonials = testimonials.filter((t) => t.approved === false).length

  const handleSeed = async () => {
    "use server"
    await seedDatabase()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Admin <span className="text-primary">Dashboard</span>
        </h1>

        <Suspense fallback={<div>Loading tabs...</div>}>
          <DashboardTabs pendingTestimonials={pendingTestimonials}>
            {/* Dashboard overview */}
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard</CardTitle>
                  <CardDescription>Overview of your portfolio content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Projects</p>
                            <h3 className="text-3xl font-bold">{projects.length}</h3>
                          </div>
                          <FolderKanban className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Experience</p>
                            <h3 className="text-3xl font-bold">{experience.length}</h3>
                          </div>
                          <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Technologies</p>
                            <h3 className="text-3xl font-bold">{technologies.length}</h3>
                          </div>
                          <Code className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Testimonials</p>
                            <h3 className="text-3xl font-bold">{testimonials.length}</h3>
                          </div>
                          <MessageSquare className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Link href="/admin/projects/new">
                            <Button className="w-full justify-start" variant="outline">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add New Project
                            </Button>
                          </Link>
                          <Link href="/admin/experience/new">
                            <Button className="w-full justify-start" variant="outline">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add New Experience
                            </Button>
                          </Link>
                          <Link href="/admin/education/new">
                            <Button className="w-full justify-start" variant="outline">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add New Education
                            </Button>
                          </Link>
                          <Link href="/admin/testimonials">
                            <Button className="w-full justify-start" variant="outline">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Review Testimonials
                              {pendingTestimonials > 0 && (
                                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                  {pendingTestimonials} pending
                                </span>
                              )}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>App Initialization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form action={handleSeed}>
                          <Button type="submit" className="w-full justify-start text-blue-600 hover:text-blue-700" variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Seed DB with Dummy Data
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Portfolio Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          {[
                            { label: "Projects", count: projects.length, href: "/admin/projects/new", icon: FolderKanban },
                            { label: "Experience Entries", count: experience.length, href: "/admin/experience/new", icon: Briefcase },
                            { label: "Education Entries", count: education.length, href: "/admin/education/new", icon: GraduationCap },
                            { label: "Services", count: services.length, href: "/admin/services/new", icon: Wrench },
                            { label: "Technologies", count: technologies.length, href: "/admin/technologies/new", icon: Code },
                            { label: "Companies", count: companies.length, href: "/admin/companies/new", icon: Building },
                          ].map(({ label, count, href, icon: Icon }) => (
                            <div key={label} className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{count}</span>
                                <Link href={href} className="text-xs text-primary hover:underline">+ Add</Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
 
            {/* Profile / About Me */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>About Me / Profile</CardTitle>
                      <CardDescription>Manage your personal information and stats</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!profile ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No profile information found in database</p>
                      <form action={handleSeed}>
                        <Button type="submit">Seed Profile from Frontend Data</Button>
                      </form>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                            <p className="text-lg font-semibold">{profile.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Headline</label>
                            <p className="text-lg font-semibold">{profile.headline}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Location</label>
                            <p>{profile.location}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Profile Image</label>
                          <div className="mt-2 relative w-32 h-32 rounded-2xl overflow-hidden border">
                            <img src={profile.image_url} alt={profile.name} className="object-cover w-full h-full" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Description Paragraphs</label>
                        <ul className="mt-2 space-y-2 list-disc pl-5">
                          {profile.description.map((p, i) => (
                            <li key={i} className="text-sm text-neutral-400">{p}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Stats</label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          {profile.stats.map((s, i) => (
                            <div key={i} className="p-3 border rounded-xl bg-muted/50">
                              <p className="text-xl font-bold">{s.value}</p>
                              <p className="text-xs text-muted-foreground">{s.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Link href="/admin/profile/edit">
                          <Button>Edit Profile</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Projects</CardTitle>
                      <CardDescription>Manage your portfolio projects</CardDescription>
                    </div>
                    <Link href="/admin/projects/new">
                      <Button>Add Project</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No projects found</p>
                      <Link href="/admin/projects/new">
                        <Button>Add Your First Project</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-lg">{project.title}</h3>
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${project.status === "published"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}>
                                    {project.status}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm line-clamp-1">{project.description}</p>
                                {project.technologies && project.technologies.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {project.technologies.slice(0, 5).map((t, i) => (
                                      <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">{t}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Link href={`/admin/projects/edit/${project.id}`}>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                                {project.live_url && (
                                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm">View</Button>
                                  </a>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Experience</CardTitle>
                      <CardDescription>Manage your work experience</CardDescription>
                    </div>
                    <Link href="/admin/experience/new">
                      <Button>Add Experience</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {experience.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No experience entries found</p>
                      <Link href="/admin/experience/new">
                        <Button>Add Your First Experience</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {experience.map((exp) => (
                        <Card key={exp.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">{exp.position}</h3>
                                <p className="text-blue-accent">{exp.company}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(exp.start_date).toLocaleDateString()} —{" "}
                                  {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : "Present"}
                                  {exp.location && ` · ${exp.location}`}
                                </p>
                                {exp.is_current && (
                                  <span className="text-xs text-emerald-500 font-semibold">● Current</span>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/admin/experience/edit/${exp.id}`}>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>Manage your education history</CardDescription>
                    </div>
                    <Link href="/admin/education/new">
                      <Button>Add Education</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {education.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No education entries found</p>
                      <Link href="/admin/education/new">
                        <Button>Add Your First Education</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {education.map((edu) => (
                        <Card key={edu.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">{edu.degree}</h3>
                                <p className="text-purple-accent">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(edu.start_date).toLocaleDateString()} —{" "}
                                  {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : "Present"}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/admin/education/edit/${edu.id}`}>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Services</CardTitle>
                      <CardDescription>Manage your services</CardDescription>
                    </div>
                    <Link href="/admin/services/new">
                      <Button>Add Service</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {services.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No services found</p>
                      <Link href="/admin/services/new"><Button>Add Your First Service</Button></Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {services.map((service) => (
                        <Card key={service.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                              </div>
                              <Link href={`/admin/services/edit/${service.id}`}>
                                <Button variant="outline" size="sm">Edit</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technologies */}
            <TabsContent value="technologies">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Technologies</CardTitle>
                      <CardDescription>Manage your technologies</CardDescription>
                    </div>
                    <Link href="/admin/technologies/new">
                      <Button>Add Technology</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {technologies.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No technologies found</p>
                      <Link href="/admin/technologies/new"><Button>Add Your First Technology</Button></Link>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech) => (
                        <Link key={tech.id} href={`/admin/technologies/edit/${tech.id}`}>
                          <div className="flex items-center gap-2 border rounded-xl px-4 py-2 hover:border-primary transition-colors cursor-pointer">
                            <span className="font-semibold text-sm">{tech.name}</span>
                            <span className="text-xs text-muted-foreground">({tech.category})</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Companies */}
            <TabsContent value="companies">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Companies</CardTitle>
                      <CardDescription>Manage your companies</CardDescription>
                    </div>
                    <Link href="/admin/companies/new">
                      <Button>Add Company</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {companies.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No companies found</p>
                      <Link href="/admin/companies/new"><Button>Add Your First Company</Button></Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {companies.map((company) => (
                        <Card key={company.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-lg">{company.name}</h3>
                              <Link href={`/admin/companies/edit/${company.id}`}>
                                <Button variant="outline" size="sm">Edit</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials */}
            <TabsContent value="testimonials">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Testimonials</CardTitle>
                      <CardDescription>Manage client testimonials</CardDescription>
                    </div>
                    <Link href="/admin/testimonials">
                      <Button>Manage Testimonials</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Go to the testimonials management page to review and approve testimonials.</p>
                    <div className="mt-4">
                      <Link href="/testimonial" target="_blank">
                        <Button variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          View Testimonial Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </DashboardTabs>
        </Suspense>
      </div>
    </section>
  )
}
