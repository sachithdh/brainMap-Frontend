"use client"

import type React from "react"
import { useCalendar } from "@/contexts/calendarContext"

interface DropZoneProps {
  date: Date
  hour?: number
  className?: string
  children?: React.ReactNode
}

export function DropZone({ date, hour = 0, className = "", children }: DropZoneProps) {
  const { draggedEvent, setDraggedEvent, events, setEvents } = useCalendar()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    const element = e.currentTarget as HTMLElement
    element.classList.add("drag-over")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement
    element.classList.remove("drag-over")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const element = e.currentTarget as HTMLElement
    element.classList.remove("drag-over")

    if (!draggedEvent) return

    // Calculate new start and end times
    const newStart = new Date(date)
    newStart.setHours(hour, 0, 0, 0)

    const originalDuration = draggedEvent.end.getTime() - draggedEvent.start.getTime()
    const newEnd = new Date(newStart.getTime() + originalDuration)

    // Update the event
    const updatedEvents = events.map((event) =>
      event.id === draggedEvent.id ? { ...event, start: newStart, end: newEnd } : event,
    )

    setEvents(updatedEvents)
    setDraggedEvent(null)

    // Show success feedback
    const notification = document.createElement("div")
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300"
    notification.textContent = "Event moved successfully!"
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "0"
      setTimeout(() => document.body.removeChild(notification), 300)
    }, 2000)
  }

  return (
    <div
      className={`${className} transition-all duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}
