import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-me-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ServicesSection } from "@/components/services-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { CompaniesSection } from "@/components/companies-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
       <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <CompaniesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
