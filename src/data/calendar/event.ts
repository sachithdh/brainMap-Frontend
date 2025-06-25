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

export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}



export const dummyEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Grooming Store",
    start: new Date(2024, 4, 21, 10, 0),
    end: new Date(2024, 4, 21, 11, 30),
    color: "bg-green-400",
    participants: ["1", "2"],
    description: "Weekly grooming session for the store presentation",
    location: "Conference Room A",
    category: "Meeting",
  },
  {
    id: "2",
    title: "Cleaning & Quality Conference Call",
    start: new Date(2024, 4, 22, 11, 0),
    end: new Date(2024, 4, 22, 12, 0),
    color: "bg-orange-400",
    participants: ["3", "4"],
    description: "Discuss quality standards and cleaning protocols",
    location: "Virtual",
    category: "Conference",
  },
  {
    id: "3",
    title: "Anniversary Breakfast A Great Alternative",
    start: new Date(2024, 4, 22, 14, 0),
    end: new Date(2024, 4, 22, 15, 30),
    color: "bg-yellow-400",
    participants: ["1", "3"],
    description: "Celebrating company anniversary with team breakfast",
    location: "Main Office Cafeteria",
    category: "Social",
  },
  {
    id: "4",
    title: "The Amazing Habits",
    start: new Date(2024, 4, 22, 16, 0),
    end: new Date(2024, 4, 22, 17, 0),
    color: "bg-blue-400",
    participants: ["2", "4"],
    description: "Workshop on developing productive habits",
    location: "Training Room B",
    category: "Workshop",
  },
  {
    id: "5",
    title: "Cleaning & Quality Conference Call",
    start: new Date(2024, 4, 23, 15, 0),
    end: new Date(2024, 4, 23, 17, 0),
    color: "bg-purple-400",
    participants: ["1", "2", "3"],
    description: "Follow-up meeting on quality improvements",
    location: "Virtual",
    category: "Conference",
  },
  {
    id: "6",
    title: "Anniversary Breakfast A Great Alternative",
    start: new Date(2024, 4, 24, 13, 0),
    end: new Date(2024, 4, 24, 15, 0),
    color: "bg-pink-400",
    participants: ["2", "4"],
    description: "Second anniversary celebration event",
    location: "Rooftop Terrace",
    category: "Social",
  },
  {
    id: "7",
    title: "The Hormone Through A Child & Diet",
    start: new Date(2024, 4, 24, 16, 0),
    end: new Date(2024, 4, 24, 18, 0),
    color: "bg-orange-500",
    participants: ["1", "3", "4"],
    description: "Health and wellness seminar",
    location: "Auditorium",
    category: "Seminar",
  },
  {
    id: "8",
    title: "The Amazing Habits",
    start: new Date(2024, 4, 25, 10, 0),
    end: new Date(2024, 4, 25, 13, 0),
    color: "bg-cyan-400",
    participants: ["1", "2"],
    description: "Advanced habits workshop session",
    location: "Workshop Room",
    category: "Workshop",
  },
  {
    id: "9",
    title: "Quality & Quality Silence Call",
    start: new Date(2024, 4, 25, 15, 0),
    end: new Date(2024, 4, 25, 16, 0),
    color: "bg-teal-400",
    participants: ["3", "4"],
    description: "Quality assurance review meeting",
    location: "Virtual",
    category: "Review",
  },
]


export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Project Manager",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Developer",
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Designer",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Marketing",
  },
]