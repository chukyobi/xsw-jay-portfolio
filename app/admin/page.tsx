import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Wrench,
  Code,
  Building,
  MessageSquare,
} from "lucide-react"

// This is a placeholder for authentication check
// In a real app, you would use a proper auth solution
const isAuthenticated = () => {
  // Check if user is authenticated
  return false
}

export default function AdminPage() {
  // Redirect if not authenticated
  if (!isAuthenticated()) {
    redirect("/admin/login")
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-20 px-4 mt-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            Admin <span className="text-primary">Dashboard</span>
          </h1>

          <Tabs defaultValue="projects" className="w-full">
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
              <TabsTrigger value="testimonials" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Testimonials</span>
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
                            <h3 className="text-3xl font-bold">12</h3>
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
                            <h3 className="text-3xl font-bold">5</h3>
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
                            <h3 className="text-3xl font-bold">24</h3>
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
                            <h3 className="text-3xl font-bold">8</h3>
                          </div>
                          <MessageSquare className="h-8 w-8 text-primary" />
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
                    <Button>Add Project</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Projects management interface would go here</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tab contents would follow the same pattern */}
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Experience</CardTitle>
                      <CardDescription>Manage your work experience</CardDescription>
                    </div>
                    <Button>Add Experience</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Experience management interface would go here</p>
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
                    <Button>Add Education</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Education management interface would go here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}
