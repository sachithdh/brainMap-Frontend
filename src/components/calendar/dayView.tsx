"use client"

import { useCalendar } from "@/contexts/calendarContext"
import { EventCard } from "./eventCard"
import { DropZone } from "./dropZone"

export function DayView() {
  const { currentDate, events } = useCalendar()

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForDay = () => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === currentDate.toDateString()
    })
  }

  const getEventPosition = (event: any) => {
    const startHour = event.start.getHours()
    const startMinute = event.start.getMinutes()
    const endHour = event.end.getHours()
    const endMinute = event.end.getMinutes()

    const top = (startHour + startMinute / 60) * 80
    const height = Math.max((endHour + endMinute / 60 - (startHour + startMinute / 60)) * 80, 40)

    return { top, height }
  }

  const dayEvents = getEventsForDay()
  const isToday = currentDate.toDateString() === new Date().toDateString()

  return (
    <div className="flex-1 h-full overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
          <div className="grid grid-cols-[120px_1fr]">
            <div className="p-4 text-sm font-medium text-gray-500 border-r border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-400 uppercase tracking-wide text-left">Time</div>
            </div>
            <div className="p-4 text-center bg-white">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
              </div>
              <div className={`text-2xl font-bold ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                {currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              {isToday && <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-2"></div>}
            </div>
          </div>
        </div>

        {/* Time Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-[120px_1fr]" style={{ minHeight: `${24 * 80}px` }}>
            {/* Time Column */}
            <div className="border-r border-gray-200 bg-gray-50">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-b border-gray-100 px-4 py-3 text-left">
                  <div className="text-sm text-gray-500 font-medium">
                    {hour === 0
                      ? "12:00 AM"
                      : hour < 12
                        ? `${hour}:00 AM`
                        : hour === 12
                          ? "12:00 PM"
                          : `${hour - 12}:00 PM`}
                  </div>
                </div>
              ))}
            </div>

            {/* Day Column */}
            <div className="relative">
              {/* Hour Grid Lines */}
              {hours.map((hour) => (
                <DropZone
                  key={hour}
                  date={currentDate}
                  hour={hour}
                  className="h-20 border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                />
              ))}

              {/* Current Time Indicator */}
              {isToday && (
                <div
                  className="absolute left-0 right-0 h-0.5 bg-red-500 z-20 pointer-events-none"
                  style={{
                    top: `${(new Date().getHours() + new Date().getMinutes() / 60) * 80}px`,
                  }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1.5"></div>
                </div>
              )}

              {/* Events */}
              {dayEvents.map((event) => {
                const { top, height } = getEventPosition(event)
                return (
                  <div
                    key={event.id}
                    className="absolute left-4 right-4 z-10"
                    style={{ top: `${top}px`, height: `${height}px` }}
                  >
                    <EventCard event={event} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}