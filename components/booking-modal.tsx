"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
  CheckCircle2,
  Calendar,
  FileText,
  Clock,
} from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { submitQuote, submitBooking } from "@/lib/actions"

type CalendarDate = {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  hasEvent: boolean
}

type Tab = "quote" | "call"
type SubmitState = "idle" | "submitting" | "success"

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
]

const SERVICES = [
  { id: "webDev", label: "Web Development" },
  { id: "mobileDev", label: "Mobile App" },
  { id: "automation", label: "Automation & Scripts" },
  { id: "embedded", label: "Electronics & Embedded" },
]

const BUDGETS = [
  { value: "below-5k", label: "Below $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-30k", label: "$15,000 – $30,000" },
  { value: "30k-50k", label: "$30,000 – $50,000" },
  { value: "50k+", label: "$50,000+" },
]

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("quote")

  // Calendar state
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(now.getFullYear(), now.getMonth()))
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h")

  // Quote form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    project: "",
    services: {} as Record<string, boolean>,
    budget: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitState, setSubmitState] = useState<SubmitState>("idle")

  // Calendar helpers
  const generateCalendarDays = (): CalendarDate[] => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    const today = new Date()
    const days: CalendarDate[] = []

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: daysInPrevMonth - i, isCurrentMonth: false, isToday: false, isSelected: false, hasEvent: false })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year
      const isPast = new Date(year, month, i) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        isSelected: selectedDate?.date === i && selectedDate.isCurrentMonth,
        hasEvent: !isPast && i % 3 !== 0, // simulate availability
      })
    }

    const remaining = 7 - (days.length % 7)
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push({ date: i, isCurrentMonth: false, isToday: false, isSelected: false, hasEvent: false })
      }
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const today = new Date()
  const isPastMonth =
    currentMonth.getFullYear() < today.getFullYear() ||
    (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() <= today.getMonth())

  const formatMonth = (date: Date) =>
    `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`

  const formatTime = (time: string) => {
    if (timeFormat === "24h") return time
    const [h, m] = time.split(":").map(Number)
    const suffix = h >= 12 ? "PM" : "AM"
    const hour = h % 12 || 12
    return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`
  }

  const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Required"
    if (!formData.email.trim()) newErrors.email = "Required"
    if (!formData.project.trim()) newErrors.project = "Required"
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    setSubmitState("submitting")
    try {
      await submitQuote(formData)
    } catch (e) {
      console.error(e)
    }
    setSubmitState("success")
  }

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return
    setSubmitState("submitting")
    try {
      await submitBooking({
        date: selectedDate.date,
        time: selectedTime,
        format: timeFormat,
        month: currentMonth.toISOString()
      })
    } catch (e) {
      console.error(e)
    }
    setSubmitState("success")
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setSubmitState("idle")
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ fullName: "", email: "", project: "", services: {}, budget: "" })
      setErrors({})
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); else setIsOpen(true) }}>
      <DialogTrigger asChild>
        <button className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-background border border-white/20 text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
          Work with me
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 bg-[#0f0f0f] text-white border border-white/10 max-w-lg rounded-2xl overflow-hidden shadow-2xl">
        <DialogTitle className="sr-only">Booking Dialog</DialogTitle>

        {/* Success state */}
        {submitState === "success" ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {activeTab === "quote" ? "Quote Sent!" : "Call Booked!"}
            </h3>
            <p className="text-neutral-400 text-sm max-w-sm mb-8">
              {activeTab === "quote"
                ? "Your request has been received. I'll get back to you within 24 hours."
                : `Your call is scheduled. You'll receive a confirmation soon.`}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Tab header */}
            <div className="grid grid-cols-2 border-b border-white/8">
              {(["quote", "call"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSelectedDate(null); setSelectedTime(null) }}
                  className={`py-4 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === tab
                      ? "bg-white/8 text-white border-b-2 border-blue-500"
                      : "text-neutral-500 hover:text-neutral-300"
                    }`}
                >
                  {tab === "quote" ? <FileText className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                  {tab === "quote" ? "Request a Quote" : "Book a Call"}
                </button>
              ))}
            </div>

            {/* Quote Form */}
            {activeTab === "quote" && (
              <form onSubmit={handleSubmitQuote} className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }); setErrors({ ...errors, fullName: "" }) }}
                      className={`bg-white/5 border ${errors.fullName ? "border-red-500/60" : "border-white/10"} rounded-xl p-3 w-full text-sm placeholder-neutral-600 focus:outline-none focus:border-blue-500/60 transition-colors`}
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }) }}
                      className={`bg-white/5 border ${errors.email ? "border-red-500/60" : "border-white/10"} rounded-xl p-3 w-full text-sm placeholder-neutral-600 focus:outline-none focus:border-blue-500/60 transition-colors`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <textarea
                    name="project"
                    placeholder="Describe your project or idea…"
                    value={formData.project}
                    onChange={(e) => { setFormData({ ...formData, project: e.target.value }); setErrors({ ...errors, project: "" }) }}
                    rows={3}
                    className={`bg-white/5 border ${errors.project ? "border-red-500/60" : "border-white/10"} rounded-xl p-3 w-full text-sm placeholder-neutral-600 focus:outline-none focus:border-blue-500/60 transition-colors resize-none`}
                  />
                  {errors.project && <p className="text-red-400 text-xs mt-1">{errors.project}</p>}
                </div>

                {/* Services */}
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-3">What do you need?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map(({ id, label }) => (
                      <label
                        key={id}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${formData.services[id]
                            ? "border-blue-500/60 bg-blue-500/10 text-white"
                            : "border-white/10 bg-white/3 text-neutral-400 hover:border-white/20"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!formData.services[id]}
                          onChange={(e) => setFormData({ ...formData, services: { ...formData.services, [id]: e.target.checked } })}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${formData.services[id] ? "bg-blue-500 border-blue-500" : "border-white/20"}`}>
                          {formData.services[id] && <span className="text-white text-[10px] font-bold">✓</span>}
                        </span>
                        <span className="text-xs font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-3">Budget Range</p>
                  <div className="relative">
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 w-full text-sm text-neutral-300 appearance-none focus:outline-none focus:border-blue-500/60 transition-colors pr-10"
                    >
                      <option value="" disabled className="bg-neutral-900">Select budget…</option>
                      {BUDGETS.map(({ value, label }) => (
                        <option key={value} value={value} className="bg-neutral-900">{label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all duration-200 text-sm tracking-wide"
                >
                  {submitState === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : "Send Request →"}
                </button>
              </form>
            )}

            {/* Book a Call */}
            {activeTab === "call" && (
              <div className="overflow-y-auto max-h-[70vh]">
                {!selectedDate ? (
                  /* Calendar view */
                  <div>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                      <h3 className="font-semibold text-white">{formatMonth(currentMonth)}</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          disabled={isPastMonth}
                          className="p-2 rounded-lg hover:bg-white/8 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className="p-2 rounded-lg hover:bg-white/8 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 px-4 py-2">
                      {DAY_LABELS.map((d) => (
                        <div key={d} className="text-center text-xs font-semibold text-neutral-600 py-2">{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 px-4 pb-4">
                      {calendarDays.map((day, i) => {
                        const isPast = day.isCurrentMonth && new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                        return (
                          <button
                            key={i}
                            onClick={() => !isPast && day.isCurrentMonth && setSelectedDate(day)}
                            disabled={!day.isCurrentMonth || isPast}
                            className={`aspect-square rounded-xl text-sm font-medium transition-all duration-150 relative flex items-center justify-center
                              ${!day.isCurrentMonth || isPast ? "text-neutral-700 cursor-not-allowed" : "cursor-pointer hover:bg-white/10 text-neutral-300"}
                              ${day.isToday ? "ring-1 ring-blue-500/60" : ""}
                              ${day.isSelected ? "bg-blue-600 text-white hover:bg-blue-500" : ""}
                            `}
                          >
                            {day.date}
                            {day.hasEvent && day.isCurrentMonth && !isPast && (
                              <span className="absolute bottom-1 w-1 h-1 bg-emerald-400 rounded-full" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-500 px-6 pb-4">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" />Available</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full ring-1 ring-blue-500" />Today</span>
                    </div>
                  </div>
                ) : !selectedTime ? (
                  /* Time selection */
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-xs text-neutral-500 mb-0.5">Selected date</p>
                        <p className="font-semibold text-white">
                          {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                        </p>
                      </div>
                      <div className="flex rounded-full bg-white/5 border border-white/10 p-1 gap-1">
                        {(["12h", "24h"] as const).map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => setTimeFormat(fmt)}
                            className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${timeFormat === fmt ? "bg-white/15 text-white" : "text-neutral-500"}`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" /> Available slots
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className="py-3 px-4 rounded-xl border border-white/10 hover:border-blue-500/60 hover:bg-blue-500/10 text-sm font-medium text-neutral-300 hover:text-white transition-all duration-200"
                        >
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>

                    <button onClick={() => setSelectedDate(null)} className="mt-5 text-sm text-neutral-500 hover:text-white transition-colors flex items-center gap-1">
                      <ChevronLeft className="h-4 w-4" /> Back to calendar
                    </button>
                  </div>
                ) : (
                  /* Confirmation */
                  <div className="p-6">
                    <h3 className="font-bold text-white text-lg mb-1">Confirm your booking</h3>
                    <p className="text-neutral-500 text-sm mb-6">Review the details before confirming.</p>

                    <div className="rounded-2xl border border-white/10 bg-white/3 p-4 space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <div>
                          <p className="text-xs text-neutral-500">Date</p>
                          <p className="text-sm font-semibold text-white">
                            {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-white/8" />
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <div>
                          <p className="text-xs text-neutral-500">Time</p>
                          <p className="text-sm font-semibold text-white">{formatTime(selectedTime)} (WAT)</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={handleConfirmBooking}
                        disabled={submitState === "submitting"}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all duration-200 text-sm"
                      >
                        {submitState === "submitting" ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Confirming…
                          </span>
                        ) : "Confirm Booking →"}
                      </button>

                      <a
                        href="https://wa.me/2348034567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/8 text-sm text-neutral-400 hover:text-emerald-400 transition-all duration-200"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Or chat on WhatsApp instead
                      </a>
                    </div>

                    <button onClick={() => setSelectedTime(null)} className="mt-4 text-sm text-neutral-500 hover:text-white transition-colors flex items-center gap-1">
                      <ChevronLeft className="h-4 w-4" /> Change time
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
