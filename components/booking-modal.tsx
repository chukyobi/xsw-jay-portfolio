"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


type CalendarDate = {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  hasEvent: boolean
}

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("quote")
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)) // May 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<CalendarDate | null>(null)
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h")

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    project: "",
    services: {
      productDesign: false,
      webDesign: false,
      branding: false,
      development: false,
    },
    budget: "",
  })
  const [errors, setErrors] = useState({
    project: false,
  })

  // Generate calendar days
  const generateCalendarDays = (): CalendarDate[] => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    const firstDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday, 1 = Monday, etc.

    const days: CalendarDate[] = []

    // Add days from previous month to fill the first week
    const prevMonth = new Date(year, month - 1)
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasEvent: false,
      })
    }

    // Add days of current month
    const today = new Date()
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
        isSelected: selectedDate === i,
        hasEvent: i === 3, // Example: day 3 has an event
      })
    }

    // Add days from next month to complete the last week
    const remainingDays = 7 - (days.length % 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          isCurrentMonth: false,
          isToday: false,
          isSelected: false,
          hasEvent: false,
        })
      }
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleSelectDate = (day: CalendarDate) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date)
      setSelectedDay(day)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === "project" && errors.project) {
      setErrors({
        ...errors,
        project: false,
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [name]: checked,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.project.trim()) {
      setErrors({
        ...errors,
        project: true,
      })
      return
    }

    // Handle form submission
    console.log("Form submitted:", formData)
    setIsOpen(false)
  }

  const timeSlots = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30"]

  const formatMonth = (date: Date) => {
    return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
  }

  const getDayOfWeek = (index: number) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    return days[index]
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center justify-center gap-1 px-8 py-8 rounded-full bg-background border border-white/20 text-lg font-semibold hover:bg-white hover:text-background transition-all duration-300">
        
            Work with me
            <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-black text-white border-zinc-800 max-w-xl rounded-xl my-2">
        {/* Tabs */}
        <div className="grid grid-cols-2">
          <button
            className={`py-4 text-center font-medium ${activeTab === "quote" ? "bg-zinc-900" : "bg-zinc-800"}`}
            onClick={() => setActiveTab("quote")}
          >
            REQUEST A QUOTE
          </button>
          <button
            className={`py-4 text-center font-medium ${activeTab === "call" ? "bg-zinc-900" : "bg-zinc-800"}`}
            onClick={() => {
              setActiveTab("call")
              setSelectedDay(null) // Reset selected day when switching to call tab
            }}
          >
            BOOK A CALL
          </button>
        </div>

        {/* Quote Form Tab */}
        {activeTab === "quote" && (
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-4">CONTACT INFORMATION</p>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-zinc-700 rounded-sm p-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Business email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-zinc-700 rounded-sm p-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>

                <div className="relative mb-4">
                  <textarea
                    name="project"
                    placeholder="Tell us about your project"
                    value={formData.project}
                    onChange={handleInputChange}
                    rows={4}
                    className="bg-zinc-700 rounded-sm p-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                  ></textarea>
                  {errors.project && (
                    <div className="absolute bottom-4 right-4 bg-zinc-800 text-xs px-2 py-1 rounded-sm">
                      Please fill in this field.
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-4">WHAT DO YOU NEED HELP WITH?</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="productDesign"
                      name="productDesign"
                      checked={formData.services.productDesign}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label htmlFor="productDesign" className="text-sm">
                      Product Management
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="webDesign"
                      name="webDesign"
                      checked={formData.services.webDesign}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label htmlFor="webDesign" className="text-sm">
                      Web Development
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="branding"
                      name="branding"
                      checked={formData.services.branding}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label htmlFor="branding" className="text-sm">
                      Electronics and Software
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="development"
                      name="development"
                      checked={formData.services.development}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label htmlFor="development" className="text-sm">
                     Mobile App 
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-4">YOUR BUDGET</p>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="bg-zinc-700 rounded-sm p-3 w-full appearance-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-sm transition duration-200"
              >
                SEND REQUEST
              </button>
            </form>
          </div>
        )}

        {/* Book a Call Tab */}
        {activeTab === "call" && (
          <div className="p-0">
            {!selectedDay ? (
              <div className="calendar">
                {/* Month navigation */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                  <h2 className="text-lg font-medium">{formatMonth(currentMonth)}</h2>
                  <div className="flex space-x-2">
                    <button onClick={handlePrevMonth} className="p-1">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={handleNextMonth} className="p-1">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 text-center py-2 border-b border-zinc-800">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <div key={day} className="text-xs font-medium text-gray-400">
                      {getDayOfWeek(day)}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-px">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectDate(day)}
                      disabled={!day.isCurrentMonth}
                      className={`
                        aspect-square flex items-center justify-center relative
                        ${!day.isCurrentMonth ? "text-zinc-700" : "text-white"}
                        ${day.isSelected ? "border border-white" : ""}
                        ${day.date === 5 && day.isCurrentMonth ? "bg-white text-black" : ""}
                        ${day.date === 7 && day.isCurrentMonth ? "border border-white" : ""}
                      `}
                    >
                      {day.date}
                      {day.hasEvent && <span className="absolute bottom-2 w-1 h-1 bg-white rounded-full"></span>}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="time-selection p-4">
                {/* Selected date and time format toggle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-medium">Mon {selectedDay.date.toString().padStart(2, "0")}</div>
                  <div className="flex rounded-full bg-zinc-800 p-1">
                    <button
                      className={`px-3 py-1 text-sm rounded-full ${timeFormat === "12h" ? "bg-zinc-700" : ""}`}
                      onClick={() => setTimeFormat("12h")}
                    >
                      12h
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full ${timeFormat === "24h" ? "bg-zinc-700" : ""}`}
                      onClick={() => setTimeFormat("24h")}
                    >
                      24h
                    </button>
                  </div>
                </div>

                {/* Time slots */}
                <div className="space-y-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className="w-full py-3 px-4 rounded-full border border-zinc-700 hover:border-zinc-500 text-center"
                      onClick={() => {
                        console.log(`Selected time: ${time}`)
                        // Here you would handle the time selection
                        // For example, you could show a confirmation or close the modal
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Chat now option */}
                <div className="mt-8 text-center">
                  <div className="text-xs text-zinc-500 mb-4">OR SIMPLY</div>
                  <button className="flex items-center justify-center space-x-2 mx-auto bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <span>Chat now</span>
                  </button>
                </div>

                {/* Back button */}
                <button className="mt-6 text-sm text-zinc-400 hover:text-white" onClick={() => setSelectedDay(null)}>
                  ← Back to calendar
                </button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
