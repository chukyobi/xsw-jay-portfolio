"use client"

import { useSearchParams } from "next/navigation"
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
} from "lucide-react"

interface DashboardTabsProps {
    children: React.ReactNode
    pendingTestimonials: number
}

export function DashboardTabs({ children, pendingTestimonials }: DashboardTabsProps) {
    const searchParams = useSearchParams()
    const defaultTab = searchParams?.get("tab") ?? "dashboard"

    return (
        <Tabs defaultValue={defaultTab} className="w-full">
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
            {children}
        </Tabs>
    )
}
