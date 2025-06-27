"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { dummyEvents, teamMembers } from "@/data/calendar/event"
import { CalendarEvent } from "@/types/CalendarEvent"

export type CalendarView = "day" | "week" | "month"



export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}

interface CalendarContextType {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  view: CalendarView
  setView: (view: CalendarView) => void
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  teamMembers: TeamMember[]
  draggedEvent: CalendarEvent | null
  setDraggedEvent: (event: CalendarEvent | null) => void
  selectedEvent: CalendarEvent | null
  setSelectedEvent: (event: CalendarEvent | null) => void
  showNewEventModal: boolean
  setShowNewEventModal: (show: boolean) => void
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)




export function CalendarProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 21))
  const [view, setView] = useState<CalendarView>("week")
  const [events, setEvents] = useState<CalendarEvent[]>(dummyEvents)
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showNewEventModal, setShowNewEventModal] = useState(false)

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        view,
        setView,
        events,
        setEvents,
        teamMembers,
        draggedEvent,
        setDraggedEvent,
        selectedEvent,
        setSelectedEvent,
        showNewEventModal,
        setShowNewEventModal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  const context = useContext(CalendarContext)
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}
