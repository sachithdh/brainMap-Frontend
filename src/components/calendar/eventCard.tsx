"use client"

import type React from "react"
import { Clock } from "lucide-react"
import { useCalendar} from "@/contexts/calendarContext"
import { CalendarEvent } from "@/types/CalendarEvent"

interface EventCardProps {
  event: CalendarEvent
  compact?: boolean
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const { setDraggedEvent, draggedEvent, setSelectedEvent } = useCalendar()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
  }

  const handleDragStart = (e: React.DragEvent) => {
    setDraggedEvent(event)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", event.id)

    // Add dragging class after a small delay to avoid flickering
    setTimeout(() => {
      const element = e.target as HTMLElement
      element.classList.add("dragging")
    }, 0)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const element = e.target as HTMLElement
    element.classList.remove("dragging")
    setDraggedEvent(null)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const isDragging = draggedEvent?.id === event.id

  if (compact) {
    return (
      <div
        className={`${event.color} rounded-lg px-3 py-2 text-white text-xs font-medium cursor-pointer hover:shadow-md transition-all duration-200 ${
          isDragging ? "dragging" : ""
        }`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
      >
        <div className="truncate font-semibold">{event.title}</div>
        <div className="flex items-center mt-1 opacity-90">
          <Clock className="h-3 w-3 mr-1" />
          <span className="text-xs">{formatTime(event.start)}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${event.color} rounded-xl p-4 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 border-l-4 border-white/30 ${
        isDragging ? "dragging" : ""
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center text-xs font-medium opacity-90 bg-white/20 rounded-full px-2 py-1">
          <Clock className="h-3 w-3 mr-1" />
          {formatTime(event.start)} - {formatTime(event.end)}
        </div>
      </div>

      <div 
        className="font-semibold text-sm mb-3 leading-tight line-clamp-2"
        title={event.title}
      >
        {event.title}
      </div>
    </div>
  )
}
