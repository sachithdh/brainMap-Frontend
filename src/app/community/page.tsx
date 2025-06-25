"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/NavBarModel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Users,
  Code,
  HelpCircle,
  Eye,
  Calendar,
  Tag,
  ArrowUp,
  Filter,
  Sparkles,
  FlameIcon as Fire,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    verified: boolean
  }
  category: string
  tags: string[]
  likes: number
  comments: number
  views: number
  createdAt: string
  isLiked: boolean
  isBookmarked: boolean
  type: "discussion" | "project" | "help"
  featured?: boolean
  trending?: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Building a Real-time Chat App with Next.js 14 and Socket.io",
    content:
      "Just completed an amazing real-time chat application using Next.js 14, Socket.io, and Prisma. The app features real-time messaging, user authentication, file sharing, and emoji reactions. I've implemented both group chats and direct messaging with end-to-end encryption. The UI is built with Tailwind CSS and includes dark mode support. Would love to get feedback from the community and answer any questions about the implementation!",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Advanced Student",
      verified: true,
    },
    category: "Project Showcase",
    tags: ["Next.js", "Socket.io", "Real-time", "Chat", "TypeScript"],
    likes: 47,
    comments: 23,
    views: 342,
    createdAt: "2 hours ago",
    isLiked: false,
    isBookmarked: true,
    type: "project",
    featured: true,
    trending: true,
  },
  {
    id: "2",
    title: "Help: Deployment issues with Vercel and Prisma",
    content:
      "I'm experiencing some strange behavior when deploying my Next.js app to Vercel. The Prisma client works perfectly in development, but I'm getting connection timeout errors in production. I've checked my environment variables and database connection string multiple times. Has anyone encountered similar issues?",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Beginner",
      verified: false,
    },
    category: "Help & Support",
    tags: ["Vercel", "Prisma", "Deployment", "Database", "Production"],
    likes: 12,
    comments: 18,
    views: 156,
    createdAt: "4 hours ago",
    isLiked: true,
    isBookmarked: false,
    type: "help",
  },
  {
    id: "3",
    title: "State Management Patterns: Zustand vs Redux Toolkit in 2024",
    content:
      "After working with both Zustand and Redux Toolkit on several projects, I wanted to share my thoughts on when to use each. Zustand shines for smaller to medium applications with its simplicity and minimal boilerplate, while RTK is still king for complex state management scenarios. What's your experience been like?",
    author: {
      name: "Michael Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Intermediate",
      verified: true,
    },
    category: "Discussion",
    tags: ["React", "State Management", "Zustand", "Redux", "Architecture"],
    likes: 34,
    comments: 29,
    views: 287,
    createdAt: "6 hours ago",
    isLiked: false,
    isBookmarked: false,
    type: "discussion",
    trending: true,
  },
]

export default function CommunityPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  const handlePostClick = (postId: string) => {
    router.push(`/community/post/${postId}`)
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || post.type === activeTab
    return matchesSearch && matchesTab
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      default:
        return 0 // Keep original order for "recent"
    }
  })

  return (
    <>
    <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA]/30 to-[#8697C4]/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#3D52A0]/20 to-[#7091E6]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-[#7091E6]/20 to-[#8697C4]/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-br from-[#3D52A0]/20 to-[#ADBBDA]/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Header */}
        <div className="bg-white/70 backdrop-blur-2xl border-b border-white/20 top-0 z-50 shadow-2xl shadow-blackwhen/5">
            <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3D52A0] to-[#7091E6] rounded-3xl blur-xl opacity-75 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-br from-[#3D52A0] via-[#7091E6] to-[#8697C4] rounded-3xl shadow-2xl">
                    <Users className="w-8 h-8 text-white" />
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-[#3D52A0] via-[#7091E6] to-[#8697C4] bg-clip-text text-transparent tracking-tight">
                    Community Hub
                    </h1>
                    <p className="text-slate-600 mt-2 text-lg font-medium">Where innovation meets collaboration</p>
                </div>
                </div>
                <div className="flex items-center gap-4">
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-3 border-2 border-slate-200 hover:border-[#3D52A0]/30 hover:bg-[#3D52A0]/5 transition-all duration-300 rounded-2xl px-6"
                >
                    <Filter className="w-5 h-5" />
                    Filters
                </Button>
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3D52A0] via-[#7091E6] to-[#8697C4] hover:from-[#3D52A0]/90 hover:via-[#7091E6]/90 hover:to-[#8697C4]/90 shadow-2xl shadow-[#3D52A0]/25 hover:shadow-[#3D52A0]/40 transition-all duration-300 rounded-2xl px-8 py-3 text-white font-semibold cursor-pointer"
                    onClick={() => router.push("/community/new")}
                >
                    <Plus className="w-5 h-5 mr-3" />
                    Create Post
                </Button>
                </div>
            </div>
            </div>
        </div>

        <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
            {/* Sidebar */}
            <div className="xl:col-span-1">
                <div className="space-y-8 sticky top-40">
                {/* Search */}
                <Card className="border-0 shadow-2xl shadow-black/10 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3D52A0]/20 to-[#7091E6]/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
                        <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-[#3D52A0]" />
                        <Input
                            placeholder="Search the community..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-4 border-0 bg-slate-50/80 focus:bg-white rounded-2xl text-base font-medium transition-all duration-300 focus:ring-2 focus:ring-[#3D52A0]/20"
                        />
                        </div>
                    </div>
                    </CardContent>
                </Card>

                {/* Premium Sort Options */}
                <Card className="border-0 shadow-2xl shadow-black/10 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-800">
                        <div className="p-2 bg-gradient-to-br from-[#3D52A0]/20 to-[#7091E6]/20 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-[#3D52A0]" />
                        </div>
                        Sort & Filter
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                    {[
                        { value: "recent", label: "Latest Posts", icon: Clock, color: "from-[#7091E6] to-[#8697C4]" },
                        { value: "popular", label: "Most Liked", icon: Heart, color: "from-[#FF6B6B] to-[#FF6B6B]/80" },
                        { value: "trending", label: "Trending Now", icon: Fire, color: "from-[#F4D06F] to-[#F4D06F]/80" },
                    ].map(({ value, label, icon: Icon, color }) => (
                        <Button
                        key={value}
                        variant={sortBy === value ? "default" : "ghost"}
                        size="lg"
                        onClick={() => setSortBy(value)}
                        className={`w-full justify-start gap-4 rounded-2xl py-4 px-4 transition-all duration-300 ${
                            sortBy === value
                            ? `bg-gradient-to-r ${color} text-white shadow-xl hover:shadow-2xl`
                            : "hover:bg-slate-50 text-slate-600 hover:text-slate-800"
                        }`}
                        >
                        <Icon className="w-5 h-5" />
                        <span className="font-semibold">{label}</span>
                        </Button>
                    ))}
                    </CardContent>
                </Card>

                {/* Glassmorphic Community Stats */}
                <Card className="border-0 shadow-2xl shadow-black/10 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-800">
                        <div className="p-2 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/30 rounded-xl">
                        <Award className="w-5 h-5 text-[#4CAF50]" />
                        </div>
                        Community Pulse
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                    {[
                        { icon: Users, label: "Active Members", value: "2,847", trend: "+12%", color: "from-[#3D52A0] to-[#7091E6]" },
                        { icon: MessageCircle, label: "Discussions", value: "1,234", trend: "+8%", color: "from-[#7091E6] to-[#8697C4]" },
                        { icon: Code, label: "Projects", value: "567", trend: "+15%", color: "from-[#4CAF50] to-[#4CAF50]/80" },
                        { icon: HelpCircle, label: "Solved", value: "892", trend: "+23%", color: "from-[#00B8D9] to-[#00B8D9]/80" },
                    ].map(({ icon: Icon, label, value, trend, color }) => (
                        <div key={label} className="group">
                        <div className="flex items-center justify-between p-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg border border-white/20">
                            <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-sm font-medium text-slate-600 block">{label}</span>
                                <span className="font-bold text-xl text-slate-800">{value}</span>
                            </div>
                            </div>
                            <div className="text-right">
                            <div className="flex items-center gap-1 text-[#4CAF50] text-sm font-semibold">
                                <ArrowUp className="w-3 h-3" />
                                {trend}
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </CardContent>
                </Card>

                {/* Interactive Trending Tags */}
                <Card className="border-0 shadow-2xl shadow-black/10 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-800">
                        <div className="p-2 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF6B6B]/30 rounded-xl">
                        <Tag className="w-5 h-5 text-[#FF6B6B]" />
                        </div>
                        Trending Topics
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {[
                        { name: "React", count: 234, color: "from-[#7091E6] to-[#8697C4]" },
                        { name: "Next.js", count: 189, color: "from-slate-700 to-slate-900" },
                        { name: "TypeScript", count: 156, color: "from-[#3D52A0] to-[#7091E6]" },
                        { name: "AI/ML", count: 98, color: "from-[#3D52A0] to-[#8697C4]" },
                        { name: "DevOps", count: 87, color: "from-[#4CAF50] to-[#4CAF50]/80" },
                        { name: "Database", count: 76, color: "from-[#00B8D9] to-[#00B8D9]/80" },
                        ].map(({ name, count, color }) => (
                        <div
                            key={name}
                            className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
                        >
                            <Badge
                            className={`bg-gradient-to-r ${color} text-white border-0 px-4 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                            #{name}
                            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {count}
                            </span>
                            </Badge>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
                </div>
            </div>

            {/* Main Content */}
            <div className="xl:col-span-4">
                <div className="space-y-8">
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-xl border-0 shadow-2xl shadow-black/10 rounded-3xl p-10 place-items-center m-0">
                    {[
                        { value: "all", label: "All Posts", icon: Sparkles },
                        { value: "discussion", label: "Discussions", icon: MessageCircle },
                        { value: "project", label: "Projects", icon: Code },
                        { value: "help", label: "Help", icon: HelpCircle },
                    ].map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                        key={value}
                        value={value}
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3D52A0] data-[state=active]:to-[#7091E6] data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-[#3D52A0]/25 transition-all duration-300 rounded-2xl py-4 px-6 font-semibold flex items-center justify-center w-full h-full m-[-20px]"
                        >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                        </TabsTrigger>
                    ))}
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-8 mt-8">
                    {/* Ultra-Modern Posts */}
                    <div className="space-y-8">
                        {sortedPosts.map((post, index) => (
                        <Card
                            key={post.id}
                            className="border-0 shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-xl cursor-pointer overflow-hidden group rounded-3xl"
                            onClick={() => handlePostClick(post.id)}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {(post.featured || post.trending) && (
                            <div className="h-2 bg-gradient-to-r from-[#3D52A0] via-[#7091E6] to-[#8697C4]"></div>
                            )}
                            <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="ring-4 ring-white shadow-2xl w-14 h-14">
                                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-[#3D52A0] to-[#7091E6] text-white font-bold text-lg">
                                        {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                    </Avatar>
                                    {post.author.verified && (
                                    <div className="absolute -bottom-1 -right-1 bg-[#4CAF50] rounded-full p-1.5 shadow-lg">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-lg text-slate-800">{post.author.name}</h3>
                                    <Badge
                                        variant="secondary"
                                        className="text-sm bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border-0 px-3 py-1 rounded-2xl font-semibold"
                                    >
                                        {post.author.role}
                                    </Badge>
                                    {post.trending && (
                                        <Badge className="text-sm bg-gradient-to-r from-[#F4D06F] to-[#F4D06F]/80 text-white px-3 py-1 rounded-2xl font-semibold shadow-lg">
                                        <Fire className="w-3 h-3 mr-1 animate-pulse" />
                                        Hot
                                        </Badge>
                                    )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.createdAt}
                                    <span>•</span>
                                    <Tag className="w-4 h-4" />
                                    {post.category}
                                    </div>
                                </div>
                                </div>
                                <div className="flex items-center gap-3">
                                {post.type === "project" && (
                                    <div className="p-3 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/30 rounded-2xl">
                                    <Code className="w-5 h-5 text-[#4CAF50]" />
                                    </div>
                                )}
                                {post.type === "help" && (
                                    <div className="p-3 bg-gradient-to-br from-[#00B8D9]/20 to-[#00B8D9]/30 rounded-2xl">
                                    <HelpCircle className="w-5 h-5 text-[#00B8D9]" />
                                    </div>
                                )}
                                {post.type === "discussion" && (
                                    <div className="p-3 bg-gradient-to-br from-[#3D52A0]/20 to-[#7091E6]/20 rounded-2xl">
                                    <MessageCircle className="w-5 h-5 text-[#3D52A0]" />
                                    </div>
                                )}
                                </div>
                            </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-[#3D52A0] transition-colors duration-300 leading-tight">
                                {post.title}
                            </h2>
                            <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-base">{post.content}</p>

                            {/* Enhanced Tags */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                {post.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-[#EDE8F5] hover:to-[#ADBBDA] hover:text-[#3D52A0] transition-all duration-300 rounded-2xl px-4 py-2 font-semibold border-0"
                                >
                                    #{tag}
                                </Badge>
                                ))}
                            </div>

                            {/* Premium Actions */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-8">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    handleLike(post.id)
                                    }}
                                    className={`gap-3 hover:bg-[#FF6B6B]/10 transition-all duration-300 rounded-2xl px-6 py-3 ${
                                    post.isLiked ? "text-[#FF6B6B] bg-[#FF6B6B]/10" : "text-slate-500"
                                    }`}
                                >
                                    <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current animate-pulse" : ""}`} />
                                    <span className="font-semibold">{post.likes}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="gap-3 text-slate-500 hover:bg-[#00B8D9]/10 hover:text-[#00B8D9] transition-all duration-300 rounded-2xl px-6 py-3"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="font-semibold">{post.comments}</span>
                                </Button>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Eye className="w-5 h-5" />
                                    <span className="font-semibold">{post.views} views</span>
                                </div>
                                </div>
                                <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    handleBookmark(post.id)
                                    }}
                                    className={`hover:bg-[#F4D06F]/10 transition-all duration-300 rounded-2xl p-3 ${
                                    post.isBookmarked ? "text-[#F4D06F] bg-[#F4D06F]/10" : "text-slate-500"
                                    }`}
                                >
                                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? "fill-current" : ""}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 rounded-2xl p-3"
                                >
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        ))}
                    </div>

                    {sortedPosts.length === 0 && (
                        <Card className="border-0 shadow-2xl shadow-black/5 bg-white/90 backdrop-blur-xl rounded-3xl">
                        <CardContent className="text-center py-20">
                            <div className="relative mx-auto mb-8 w-28 h-28">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3D52A0]/30 to-[#7091E6]/30 rounded-full blur-2xl"></div>
                            <div className="relative w-28 h-28 bg-gradient-to-br from-[#EDE8F5] to-[#ADBBDA] rounded-full flex items-center justify-center">
                                <MessageCircle className="w-14 h-14 text-[#3D52A0]" />
                            </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-800">No posts found</h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                            {searchQuery
                                ? "Try adjusting your search terms or explore different categories to discover amazing content"
                                : "Be the first to spark a conversation and help build our thriving community!"}
                            </p>
                            <Button 
                            size="lg"
                            className="bg-gradient-to-r from-[#3D52A0] to-[#7091E6] hover:from-[#3D52A0]/90 hover:to-[#7091E6]/90 shadow-2xl shadow-[#3D52A0]/25 rounded-2xl px-8 py-4 font-semibold text-lg"
                            >
                            <Plus className="w-5 h-5 mr-3" />
                            Create First Post
                            </Button>
                        </CardContent>
                        </Card>
                    )}
                    </TabsContent>
                </Tabs>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}
