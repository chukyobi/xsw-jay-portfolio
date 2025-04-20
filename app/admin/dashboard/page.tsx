import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutDashboard,
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
  getProjects,
  getExperience,
  getEducation,
  getServices,
  getTechnologies,
  getCompanies,
  getTestimonials,
} from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"

export default async function AdminDashboardPage() {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  // Fetch data for dashboard stats
  const [projects, experience, education, services, technologies, companies, testimonials] = await Promise.all([
    getProjects(100),
    getExperience(),
    getEducation(),
    getServices(),
    getTechnologies(),
    getCompanies(),
    getTestimonials(false), // Get all testimonials
  ])

  // Count pending testimonials
  const pendingTestimonials = testimonials.filter((t) => t.approved === false).length

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Admin <span className="text-primary">Dashboard</span>
        </h1>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4" />
              <span className="hidden md:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden md:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="technologies" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden md:inline">Technologies</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">Companies</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2 relative">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">Testimonials</span>
              {pendingTestimonials > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {pendingTestimonials}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

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
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="mr-4 mt-0.5">
                            <span className="flex h-2 w-2 rounded-full bg-blue-accent"></span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">New testimonial submitted</p>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 mt-0.5">
                            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Project updated</p>
                            <p className="text-sm text-muted-foreground">Yesterday</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 mt-0.5">
                            <span className="flex h-2 w-2 rounded-full bg-purple-accent"></span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">New technology added</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                            <div>
                              <h3 className="font-bold text-lg">{project.title}</h3>
                              <p className="text-muted-foreground">{project.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/admin/projects/edit/${project.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
                              <Link href={`/projects/${project.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
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
                                {new Date(exp.start_date).toLocaleDateString()} -
                                {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : "Present"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/admin/experience/edit/${exp.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
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
                                {new Date(edu.start_date).toLocaleDateString()} -
                                {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : "Present"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/admin/education/edit/${edu.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
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
                    <Link href="/admin/services/new">
                      <Button>Add Your First Service</Button>
                    </Link>
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
                            <div className="flex gap-2">
                              <Link href={`/admin/services/edit/${service.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
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
                    <Link href="/admin/technologies/new">
                      <Button>Add Your First Technology</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {technologies.map((tech) => (
                      <Card key={tech.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{tech.name}</h3>
                              <p className="text-muted-foreground">Category: {tech.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/admin/technologies/edit/${tech.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
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
                    <Link href="/admin/companies/new">
                      <Button>Add Your First Company</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {companies.map((company) => (
                      <Card key={company.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{company.name}</h3>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/admin/companies/edit/${company.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
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
                  <p>Go to the testimonials management page to review and approve testimonials.</p>
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
        </Tabs>
      </div>
    </section>
  )
}
