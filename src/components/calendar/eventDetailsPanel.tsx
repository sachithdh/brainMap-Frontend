"use client"

import { useState } from "react"
import { X, Edit3, Trash2, Clock, MapPin, Users, Tag, Save, Calendar } from "lucide-react"
import { useCalendar } from "@/contexts/calendarContext"

export function EventDetailsPanel() {
  const { selectedEvent, setSelectedEvent, events, setEvents, teamMembers } = useCalendar()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    start: "",
    end: "",
    participants: [] as string[],
  })

  if (!selectedEvent) {
    return (
      <div className="w-96 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center p-8">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Event Selected</h3>
          <p className="text-sm text-gray-500">Click on an event to view its details</p>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    setEditForm({
      title: selectedEvent.title,
      description: selectedEvent.description || "",
      location: selectedEvent.location || "",
      category: selectedEvent.category || "",
      start: selectedEvent.start.toISOString().slice(0, 16),
      end: selectedEvent.end.toISOString().slice(0, 16),
      participants: selectedEvent.participants,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            title: editForm.title,
            description: editForm.description,
            location: editForm.location,
            category: editForm.category,
            start: new Date(editForm.start),
            end: new Date(editForm.end),
            participants: editForm.participants,
          }
        : event,
    )
    setEvents(updatedEvents)
    setSelectedEvent({
      ...selectedEvent,
      title: editForm.title,
      description: editForm.description,
      location: editForm.location,
      category: editForm.category,
      start: new Date(editForm.start),
      end: new Date(editForm.end),
      participants: editForm.participants,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    const updatedEvents = events.filter((event) => event.id !== selectedEvent.id)
    setEvents(updatedEvents)
    setSelectedEvent(null)
  }

  const handleParticipantToggle = (memberId: string) => {
    setEditForm((prev) => ({
      ...prev,
      participants: prev.participants.includes(memberId)
        ? prev.participants.filter((id) => id !== memberId)
        : [...prev.participants, memberId],
    }))
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getParticipants = () => {
    return selectedEvent.participants.map((id) => teamMembers.find((member) => member.id === id)).filter(Boolean)
  }

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
          <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {isEditing ? (
          <div className="space-y-6">
            {/* Edit Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option value="Meeting">Meeting</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Social">Social</option>
                <option value="Seminar">Seminar</option>
                <option value="Review">Review</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  value={editForm.start}
                  onChange={(e) => setEditForm({ ...editForm, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="datetime-local"
                  value={editForm.end}
                  onChange={(e) => setEditForm({ ...editForm, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Participants</label>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <label key={member.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.participants.includes(member.id)}
                      onChange={() => handleParticipantToggle(member.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <img src='user.jpg' alt={member.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-gray-700">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Event Color Badge */}
            <div className={`${selectedEvent.color} rounded-lg p-4 text-white`}>
              <h3 className="text-lg font-semibold mb-2">{selectedEvent.title}</h3>
              {selectedEvent.category && (
                <div className="flex items-center text-sm opacity-90">
                  <Tag className="h-4 w-4 mr-2" />
                  {selectedEvent.category}
                </div>
              )}
            </div>

            {/* Time */}
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Start</div>
                <div className="text-sm text-gray-600">{formatDateTime(selectedEvent.start)}</div>
                <div className="text-sm font-medium text-gray-900 mt-2">End</div>
                <div className="text-sm text-gray-600">{formatDateTime(selectedEvent.end)}</div>
              </div>
            </div>

            {/* Location */}
            {selectedEvent.location && (
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-600">{selectedEvent.location}</div>
                </div>
              </div>
            )}

            {/* Participants */}
            {getParticipants().length > 0 && (
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-3">Participants</div>
                  <div className="space-y-2">
                    {getParticipants().map((participant) => (
                      <div key={participant?.id} className="flex items-center space-x-3">
                        <img
                          src='user.jpg'
                          alt={participant?.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{participant?.name}</div>
                          <div className="text-xs text-gray-500">{participant?.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {selectedEvent.description && (
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Description</div>
                <div className="text-sm text-gray-600 leading-relaxed">{selectedEvent.description}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200">
        {isEditing ? (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Event
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
