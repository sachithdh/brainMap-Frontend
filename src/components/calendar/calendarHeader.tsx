"use client"

import type React from "react"
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react"
import { useCalendar } from "@/contexts/calendarContext"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "primary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

function Button({ variant = "default", size = "md", className = "", children, ...props }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm"

  const variants = {
    default: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
    outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function CalendarHeader() {
  const { currentDate, setCurrentDate, view, setView, setShowNewEventModal } = useCalendar()

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }

    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const formatHeaderDate = () => {
    if (view === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    } else {
      return currentDate.toLocaleDateString("en-US", { year: "numeric", month: "long" })
    }
  }


  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">{formatHeaderDate()}</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday} className="font-medium">
            Today
          </Button>

          <div className="flex items-center border border-gray-200 rounded-lg">
            <Button variant="ghost" size="sm" onClick={() => navigateDate("prev")} className="border-0 rounded-r-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateDate("next")}
              className="border-0 rounded-l-none border-l border-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={view === "day" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setView("day")}
            className={view === "day" ? "shadow-none" : ""}
          >
            Day
          </Button>
          <Button
            variant={view === "week" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setView("week")}
            className={view === "week" ? "shadow-none" : ""}
          >
            Week
          </Button>
          <Button
            variant={view === "month" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setView("month")}
            className={view === "month" ? "shadow-none" : ""}
          >
            Month
          </Button>
        </div>

        <Button variant="primary" size="sm" className="ml-4 cursor-pointer" onClick={() => setShowNewEventModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>
    </div>
  )
}
