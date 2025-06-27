"use client"

import { useCalendar } from "@/contexts/calendarContext"
import { EventCard } from "./eventCard"
import { DropZone } from "./dropZone"

export function WeekView() {
  const { currentDate, events } = useCalendar()

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const weekDays = getWeekDays()

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === day.toDateString()
    })
  }

  const getEventPosition = (event: any) => {
    const startHour = event.start.getHours()
    const startMinute = event.start.getMinutes()
    const endHour = event.end.getHours()
    const endMinute = event.end.getMinutes()

    const top = (startHour + startMinute / 60) * 64
    const height = Math.max((endHour + endMinute / 60 - (startHour + startMinute / 60)) * 64, 32)

    return { top, height }
  }

  const isToday = (day: Date) => {
    const today = new Date()
    return day.toDateString() === today.toDateString()
  }

  return (
    <div className="flex-1 h-full overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="grid grid-cols-8">
            <div className="p-4 text-sm font-medium text-gray-500 border-r border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-400 uppercase tracking-wide">Time</div>
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-4 text-center border-r border-gray-200 last:border-r-0 bg-white">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className={`text-xl font-bold ${isToday(day) ? "text-blue-600" : "text-gray-900"}`}>
                  {day.getDate()}
                </div>
                {isToday(day) && <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Time Grid */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="grid grid-cols-8">
            {/* Time Column */}
            <div className="border-r border-gray-200 bg-gray-50">
              {hours.map((hour) => (
                <div key={hour} className="h-16 border-b border-gray-100 px-4 py-2 text-right">
                  <div className="text-xs text-gray-500 font-medium">
                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                  </div>
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="relative border-r border-gray-200 last:border-r-0">
                {/* Hour Grid Lines */}
                {hours.map((hour) => (
                  <DropZone
                    key={hour}
                    date={day}
                    hour={hour}
                    className="h-16 border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                  />
                ))}

                {/* Current Time Indicator */}
                {isToday(day) && (
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-red-500 z-20 pointer-events-none"
                    style={{
                      top: `${(new Date().getHours() + new Date().getMinutes() / 60) * 64}px`,
                    }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1.5"></div>
                  </div>
                )}

                {/* Events */}
                {getEventsForDay(day).map((event) => {
                  const { top, height } = getEventPosition(event)
                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 z-10"
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      <EventCard event={event} />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
