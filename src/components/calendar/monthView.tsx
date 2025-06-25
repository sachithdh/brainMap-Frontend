"use client"

import { useCalendar } from "@/contexts/calendarContext"
import { EventCard } from "./eventCard"
import { DropZone } from "./dropZone"

export function MonthView() {
  const { currentDate, events } = useCalendar()

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    // const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const monthDays = getMonthDays()
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getEventsForDay = (day: Date) => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.start)
        return eventDate.toDateString() === day.toDateString()
      })
      .slice(0, 3) // Limit to 3 events per day for space
  }

  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentDate.getMonth()
  }

  const isToday = (day: Date) => {
    const today = new Date()
    return day.toDateString() === today.toDateString()
  }

  return (
    <div className="flex-1 h-full overflow-auto p-8 bg-gray-50">
      <div className="min-h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 flex-shrink-0">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wide border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1">
          {monthDays.map((day, index) => (
            <DropZone
              key={index}
              date={day}
              className={`min-h-20 p-3 border-r border-b border-gray-200 last:border-r-0 transition-colors hover:bg-blue-50/30 ${
                !isCurrentMonth(day) ? "bg-gray-50/50" : "bg-white"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`text-sm font-semibold flex items-center justify-center ${
                      isToday(day)
                        ? "bg-blue-600 text-white w-7 h-7 rounded-full"
                        : isCurrentMonth(day)
                          ? "text-gray-900"
                          : "text-gray-400"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  {getEventsForDay(day).map((event) => (
                    <div key={event.id} className="text-xs">
                      <EventCard event={event} compact />
                    </div>
                  ))}
                  {events.filter((event) => {
                    const eventDate = new Date(event.start)
                    return eventDate.toDateString() === day.toDateString()
                  }).length > 3 && (
                    <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded">
                      +
                      {events.filter((event) => {
                        const eventDate = new Date(event.start)
                        return eventDate.toDateString() === day.toDateString()
                      }).length - 3}{" "}
                      more
                    </div>
                  )}
                </div>
              </div>
            </DropZone>
          ))}
        </div>
      </div>
    </div>
  )
}
