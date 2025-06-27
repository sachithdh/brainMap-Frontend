export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color: string
  participants: string[]
  description?: string
  location?: string
  category?: string
}