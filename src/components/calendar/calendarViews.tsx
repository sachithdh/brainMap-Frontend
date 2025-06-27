"use client"

import { useCalendar } from "@/contexts/calendarContext"
import { DayView } from "./dayView"
import { WeekView } from "./weekView"
import { MonthView } from "./monthView"

export function CalendarViews() {
  const { view } = useCalendar()

  return (
    <div className="flex-1 overflow-hidden">
      {view === "day" && <DayView />}
      {view === "week" && <WeekView />}
      {view === "month" && <MonthView />}
    </div>
  )
}
