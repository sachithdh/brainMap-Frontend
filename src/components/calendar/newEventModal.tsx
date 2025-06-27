"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Users, Tag, Save, Palette } from "lucide-react"
import { useCalendar } from "@/contexts/calendarContext"
import Image from "next/image"

const eventColors = [
  { name: "Blue", value: "bg-blue-400", class: "bg-blue-400" },
  { name: "Green", value: "bg-green-400", class: "bg-green-400" },
  { name: "Orange", value: "bg-orange-400", class: "bg-orange-400" },
  { name: "Purple", value: "bg-purple-400", class: "bg-purple-400" },
  { name: "Pink", value: "bg-pink-400", class: "bg-pink-400" },
  { name: "Yellow", value: "bg-yellow-400", class: "bg-yellow-400" },
  { name: "Red", value: "bg-red-400", class: "bg-red-400" },
  { name: "Cyan", value: "bg-cyan-400", class: "bg-cyan-400" },
  { name: "Teal", value: "bg-teal-400", class: "bg-teal-400" },
  { name: "Indigo", value: "bg-indigo-400", class: "bg-indigo-400" },
]

const categories = [
  "Meeting",
  "Conference",
  "Workshop",
  "Social",
  "Seminar",
  "Review",
  "Training",
  "Presentation",
  "Planning",
  "Other",
]

export function NewEventModal() {
  const { showNewEventModal, setShowNewEventModal, events, setEvents, teamMembers, currentDate } = useCalendar()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    start: "",
    end: "",
    color: "bg-blue-400",
    participants: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form with current date when modal opens
  useEffect(() => {
    if (showNewEventModal) {
      const now = new Date()
      const startTime = new Date(currentDate)
      startTime.setHours(now.getHours() + 1, 0, 0, 0)
      const endTime = new Date(startTime)
      endTime.setHours(startTime.getHours() + 1)

      setFormData({
        title: "",
        description: "",
        category: "",
        start: startTime.toISOString().slice(0, 16),
        end: endTime.toISOString().slice(0, 16),
        color: "bg-blue-400",
        participants: [],
      })
      setErrors({})
    }
  }, [showNewEventModal, currentDate])

  const handleClose = () => {
    setShowNewEventModal(false)
    setFormData({
      title: "",
      description: "",
      category: "",
      start: "",
      end: "",
      color: "bg-blue-400",
      participants: [],
    })
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.start) {
      newErrors.start = "Start time is required"
    }

    if (!formData.end) {
      newErrors.end = "End time is required"
    }

    if (formData.start && formData.end && new Date(formData.start) >= new Date(formData.end)) {
      newErrors.end = "End time must be after start time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      start: new Date(formData.start),
      end: new Date(formData.end),
      color: formData.color,
      participants: formData.participants,
    }

    setEvents([...events, newEvent])
    handleClose()

    // Show success notification
    const notification = document.createElement("div")
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300"
    notification.textContent = "Event created successfully!"
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "0"
      setTimeout(() => document.body.removeChild(notification), 300)
    }, 3000)
  }

  const handleParticipantToggle = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.includes(memberId)
        ? prev.participants.filter((id) => id !== memberId)
        : [...prev.participants, memberId],
    }))
  }

  if (!showNewEventModal) return null

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className={`${formData.color} p-2 rounded-lg`}>
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors" type="button">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter event title..."
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.start ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.start && <p className="mt-1 text-sm text-red-600">{errors.start}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.end ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.end && <p className="mt-1 text-sm text-red-600">{errors.end}</p>}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Palette className="inline h-4 w-4 mr-1" />
                Event Color
              </label>
              <div className="grid grid-cols-5 gap-3">
                {eventColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`${color.class} h-10 w-full rounded-lg transition-all duration-200 hover:scale-105 ${
                      formData.color === color.value
                        ? "ring-4 ring-blue-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Add event description..."
              />
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Users className="inline h-4 w-4 mr-1" />
                Participants
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teamMembers.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.participants.includes(member.id)}
                      onChange={() => handleParticipantToggle(member.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Image src={"/user.jpg"} width={100} height={100} alt={member.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{member.name}</div>
                      <div className="text-xs text-gray-500 truncate">{member.role}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
