"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import type { Experience } from "@/lib/types"

export function ExperienceDisplay({ experiences }: { experiences: Experience[] }) {
  const isMobile = useMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
    <div className="relative max-w-3xl mx-auto" ref={sectionRef}>
      {/* Vertical timeline line */}
      {!isMobile && (
        <motion.div
          className="absolute left-1/2 top-0 w-0.5 h-full bg-border"
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
        />
      )}

      {/* Mobile vertical timeline line */}
      {isMobile && (
        <motion.div
          className="absolute left-6 top-0 w-0.5 h-full bg-border"
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
        />
      )}

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <ExperienceItem key={experience.id} experience={experience} index={index} isMobile={isMobile} />
        ))}
      </div>
    </div>
  )
}

function ExperienceItem({
  experience,
  index,
  isMobile,
}: {
  experience: Experience
  index: number
  isMobile: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const startDate = new Date(experience.start_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })

  const endDate = experience.end_date
    ? new Date(experience.end_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Present"

  return (
    <motion.div
      ref={itemRef}
      style={{ scale, opacity }}
      className={`relative ${isMobile ? "pl-12" : index % 2 === 0 ? "pr-8 ml-auto" : "pl-8"} ${
        isMobile ? "w-full" : "w-1/2"
      }`}
    >
      {/* Timeline node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 * index }}
        className={`absolute ${
          isMobile ? "left-4 top-4" : index % 2 === 0 ? "left-0 top-4" : "right-0 top-4"
        } w-4 h-4 rounded-full bg-blue-accent transform ${
          isMobile ? "-translate-x-1/2" : index % 2 === 0 ? "-translate-x-1/2" : "translate-x-1/2"
        }`}
      />

      {/* Connecting line to node */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 * index + 0.2 }}
        className={`absolute ${
          isMobile
            ? "left-4 top-4 w-8 h-0.5 bg-blue-accent origin-left"
            : index % 2 === 0
              ? "left-0 top-4 w-8 h-0.5 bg-blue-accent origin-left"
              : "right-0 top-4 w-8 h-0.5 bg-blue-accent origin-right"
        }`}
        style={{
          transformOrigin: isMobile || index % 2 === 0 ? "left" : "right",
        }}
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{experience.position}</h3>
            <p className="text-blue-accent">{experience.company}</p>
            <div className="flex items-center mt-1 mb-4">
              <p className="text-sm text-muted-foreground">
                {startDate} - {endDate}
              </p>
              {experience.is_current && (
                <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">Current</Badge>
              )}
            </div>
            {experience.description && <p className="text-muted-foreground">{experience.description}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
