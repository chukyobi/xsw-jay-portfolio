"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import type { Education } from "@/lib/types"

export function EducationDisplay({ education }: { education: Education[] }) {
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
        {education.map((edu, index) => (
          <EducationItem key={edu.id} education={edu} index={index} isMobile={isMobile} />
        ))}
      </div>
    </div>
  )
}

function EducationItem({
  education,
  index,
  isMobile,
}: {
  education: Education
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

  const startDate = new Date(education.start_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })

  const endDate = education.end_date
    ? new Date(education.end_date).toLocaleDateString("en-US", {
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
        } w-4 h-4 rounded-full bg-purple-accent transform ${
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
            ? "left-4 top-4 w-8 h-0.5 bg-purple-accent origin-left"
            : index % 2 === 0
              ? "left-0 top-4 w-8 h-0.5 bg-purple-accent origin-left"
              : "right-0 top-4 w-8 h-0.5 bg-purple-accent origin-right"
        }`}
        style={{
          transformOrigin: isMobile || index % 2 === 0 ? "left" : "right",
        }}
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{education.degree}</h3>
            <p className="text-purple-accent">{education.institution}</p>
            {education.field_of_study && <p className="text-muted-foreground">{education.field_of_study}</p>}
            <div className="flex items-center mt-1 mb-4">
              <p className="text-sm text-muted-foreground">
                {startDate} - {endDate}
              </p>
              {education.is_current && (
                <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">Current</Badge>
              )}
            </div>
            {education.description && <p className="text-muted-foreground">{education.description}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
