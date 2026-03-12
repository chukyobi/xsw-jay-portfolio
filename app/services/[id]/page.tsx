import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/actions"
import { Code, Laptop, Zap, Cpu, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Metadata } from "next"

export const revalidate = 3600

type Props = {
  params: Promise<{ id: string }>
}

function getServiceDetails(id: string, title: string) {
  // A mapping of supplementary premium content based on service type.
  const isWeb = title.toLowerCase().includes("web")
  const isMobile = title.toLowerCase().includes("mobile")
  const isAutomation = title.toLowerCase().includes("automation")
  
  if (isWeb) return {
    accent: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-900/10",
    features: ["Responsive UI/UX Design", "Performant Single Page Applications", "SEO Optimization", "Robust Backend Integration", "REST & GraphQL APIs", "Secure Identity Management"],
    Icon: Laptop,
    deliverables: "Full-stack cloud deployments, completely maintained codebase, automated CI/CD pipelines, and high-availability architecture.",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  }
  if (isMobile) return {
    accent: "#8b5cf6",
    gradient: "from-violet-500/20 to-violet-900/10",
    features: ["Cross-platform Codebase", "Native Performance", "Offline Capability", "Push Notifications", "Biometric Authentication", "App Store Deployment"],
    Icon: Code,
    deliverables: "Production-ready Android & iOS binaries, continuous integration setup for automated stores release, and seamless UX patterns.",
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "Firebase"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
  }
  if (isAutomation) return {
    accent: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-900/10",
    features: ["Data Extraction & Parsing", "Workflow Optimization", "Custom Chatbots", "API Bridges", "Scheduled Cron Jobs", "Error Alerting Systems"],
    Icon: Zap,
    deliverables: "Autonomous scripts, managed cloud functions, and comprehensive telemetry for background processes.",
    technologies: ["Python", "Go", "Docker", "AWS Lambda", "Puppeteer"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
  }
  // Default/Embedded
  return {
    accent: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-900/10",
    features: ["PCB Layout & Design", "Microcontroller Firmware", "Real-Time OS (RTOS)", "Sensor Integrations", "Low Energy Bluetooth (BLE)", "IoT Dashboards"],
    Icon: Cpu,
    deliverables: "Tested firmware binaries, schematic files, cloud-synchronized IoT architecture, and manufacturing-ready documentation.",
    technologies: ["C++", "C", "FreeRTOS", "Altium", "ESP32"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params
  const service = await getServiceById(p.id)
  
  if (!service) {
    return {
      title: "Service Not Found"
    }
  }

  return {
    title: `${service.title} | Chukwudi Obi`,
    description: service.description,
  }
}

export default async function ServiceDetailsPage({ params }: Props) {
  const p = await params
  const service = await getServiceById(p.id)

  if (!service) {
    notFound()
  }

  const details = getServiceDetails(service.id, service.title)
  const { Icon, accent, gradient, features, deliverables, technologies, image } = details

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Dynamic Header Gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-[600px] opacity-20 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }}
      />
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-30"
        style={{ background: accent }}
      />

      <div className="container mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10 w-full max-w-6xl">
        
        {/* Navigation */}
        <Link 
          href="/#services" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors mb-12 text-sm font-semibold text-neutral-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fade-in-0">
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8"
              style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}
            >
              <Icon className="w-10 h-10" style={{ color: accent }} />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          <div className={`relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-tr ${gradient} animate-in fade-in slide-in-from-right-8 duration-1000`}>
             {/* Using an image to give a premium feel to the service page */}
             <div className="absolute inset-0 bg-black/40 z-10" />
             <img 
               src={image} 
               alt={service.title} 
               className="object-cover w-full h-full opacity-80 mix-blend-overlay"
             />
             <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2">
                  {technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
            {/* Features Module */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-white/20"></span>
                Core Capabilities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <CheckCircle2 className="w-6 h-6" style={{ color: accent }} />
                    <span className="font-medium text-neutral-200">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Deliverables Module */}
            <section className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
              <h3 className="text-2xl font-bold mb-4">What You Get</h3>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {deliverables}
              </p>
            </section>
          </div>

          {/* Sidebar CTA */}
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="sticky top-32 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to build?</h3>
              <p className="text-neutral-400 mb-8 text-sm">
                Let's discuss how my expertise in {service.title.toLowerCase()} can accelerate your next ambitious project.
              </p>
              <Link 
                href="/#contact"
                className="w-full block text-center py-4 rounded-xl font-bold text-black transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: accent }}
              >
                Start a Conversation
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
