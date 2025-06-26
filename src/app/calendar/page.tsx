"use client"
import { CalendarProvider } from "@/contexts/calendarContext"
import { CalendarHeader } from "@/components/calendar/calendarHeader"
import { CalendarViews } from "@/components/calendar/calendarViews"
import { EventDetailsPanel } from "@/components/calendar/eventDetailsPanel"
import { NewEventModal } from "@/components/calendar/newEventModal"

export default function CalendarPage() {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col">
            <CalendarHeader />
            <CalendarViews />
          </div>
          <EventDetailsPanel />
        </div>
        <NewEventModal />
      </div>
    </CalendarProvider>
  )
}
