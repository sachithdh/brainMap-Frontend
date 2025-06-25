"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  Tag,
  Code,
  HelpCircle,
  Users,
  Reply,
  MoreHorizontal,
  ThumbsUp,
  Flag,
  Send,
  Smile,
} from "lucide-react"

interface Comment {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    verified: boolean
  }
  likes: number
  replies: Comment[]
  createdAt: string
  isLiked: boolean
}

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
}

const mockPost: Post = {
  id: "1",
  title: "Building a Real-time Chat App with Next.js 14 and Socket.io",
  content: `Just completed an amazing real-time chat application using Next.js 14, Socket.io, and Prisma. This project has been a fantastic learning experience, and I wanted to share the journey with the community.

## Key Features Implemented:
- **Real-time messaging** with Socket.io
- **User authentication** using NextAuth.js
- **File sharing** with drag-and-drop support
- **Emoji reactions** and custom emoji picker
- **Group chats and direct messaging**
- **End-to-end encryption** for secure communication
- **Dark mode support** with theme persistence
- **Mobile-responsive design**

## Tech Stack:
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Socket.io, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Vercel + Railway

## Challenges Faced:
The biggest challenge was implementing real-time features while maintaining good performance. I had to optimize the Socket.io connections and implement proper room management for group chats.

## What I Learned:
This project taught me a lot about real-time web applications, WebSocket management, and scaling considerations. The authentication flow with NextAuth.js was also a great learning experience.

I've open-sourced the project on GitHub and would love to get feedback from the community. Feel free to ask any questions about the implementation!

**GitHub**: https://github.com/sarahchen/realtime-chat-app
**Live Demo**: https://chat-app-demo.vercel.app`,
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
}

const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This is incredible work, Sarah! I've been trying to implement real-time features in my own project. Could you share more details about how you handled the Socket.io room management?",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Intermediate",
      verified: false,
    },
    likes: 8,
    replies: [
      {
        id: "1-1",
        content:
          "Thanks Alex! For room management, I created a custom hook that handles joining/leaving rooms based on the current chat context. I also implemented a cleanup function to prevent memory leaks. Happy to share the code snippet if you're interested!",
        author: {
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Advanced Student",
          verified: true,
        },
        likes: 12,
        replies: [],
        createdAt: "1 hour ago",
        isLiked: false,
      },
      {
        id: "1-2",
        content: "That would be amazing! I'm particularly interested in the cleanup function part.",
        author: {
          name: "Alex Rodriguez",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Intermediate",
          verified: false,
        },
        likes: 3,
        replies: [],
        createdAt: "45 minutes ago",
        isLiked: true,
      },
    ],
    createdAt: "2 hours ago",
    isLiked: true,
  },
  {
    id: "2",
    content:
      "Great project! How did you handle the end-to-end encryption? I'm working on a similar project and security is a major concern for me.",
    author: {
      name: "Michael Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Advanced Student",
      verified: true,
    },
    likes: 15,
    replies: [],
    createdAt: "1.5 hours ago",
    isLiked: false,
  },
  {
    id: "3",
    content:
      "The UI looks fantastic! Did you use any specific component library or is it all custom Tailwind? The dark mode implementation is particularly smooth.",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Beginner",
      verified: false,
    },
    likes: 6,
    replies: [],
    createdAt: "1 hour ago",
    isLiked: false,
  },
]

export default function PostPage({  }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post>(mockPost)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleLike = () => {
    setPost({ ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 })
  }

  const handleBookmark = () => {
    setPost({ ...post, isBookmarked: !post.isBookmarked })
  }

  const handleCommentLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
                    : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
            : comment,
        ),
      )
    }
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Student",
        verified: false,
      },
      likes: 0,
      replies: [],
      createdAt: "Just now",
      isLiked: false,
    }

    setComments([comment, ...comments])
    setNewComment("")
    setPost({ ...post, comments: post.comments + 1 })
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      content: replyContent,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Student",
        verified: false,
      },
      likes: 0,
      replies: [],
      createdAt: "Just now",
      isLiked: false,
    }

    setComments(
      comments.map((comment) =>
        comment.id === parentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
      ),
    )
    setReplyContent("")
    setReplyingTo(null)
  }

  const CommentComponent = ({
    comment,
    isReply = false,
    parentId,
  }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`${isReply ? "ml-8 mt-4" : ""}`}>
      <div className="flex gap-3">
        <div className="relative">
          <Avatar className={`${isReply ? "w-8 h-8" : "w-10 h-10"} ring-2 ring-value2 ring-offset-1`}>
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm">
              {comment.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {comment.author.verified && (
            <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-0.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-value2/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-primary">{comment.author.name}</span>
              <Badge variant="outline" className="text-xs bg-value2/50 border-0">
                {comment.author.role}
              </Badge>
              <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCommentLike(comment.id, isReply, parentId)}
              className={`gap-1 text-xs h-8 ${comment.isLiked ? "text-danger" : "text-muted-foreground"}`}
            >
              <ThumbsUp className={`w-3 h-3 ${comment.isLiked ? "fill-current" : ""}`} />
              {comment.likes}
            </Button>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="gap-1 text-xs h-8 text-muted-foreground hover:text-secondary"
              >
                <Reply className="w-3 h-3" />
                Reply
              </Button>
            )}
            <Button variant="ghost" size="sm" className="gap-1 text-xs h-8 text-muted-foreground hover:text-danger">
              <Flag className="w-3 h-3" />
              Report
            </Button>
          </div>
          {replyingTo === comment.id && (
            <div className="mt-3 ml-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px] resize-none border-value2/50 focus:border-secondary"
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          )}
          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentComponent key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-value3 via-white to-value3">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-value2/50 sticky top-16 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Button>
            <div className="h-6 w-px bg-value2"></div>
            <div className="flex items-center gap-2">
              {post.type === "project" && (
                <div className="p-1.5 bg-accent/20 rounded-lg">
                  <Code className="w-4 h-4 text-accent" />
                </div>
              )}
              {post.type === "help" && (
                <div className="p-1.5 bg-info/20 rounded-lg">
                  <HelpCircle className="w-4 h-4 text-info" />
                </div>
              )}
              {post.type === "discussion" && (
                <div className="p-1.5 bg-secondary/20 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-secondary" />
                </div>
              )}
              <span className="text-sm text-muted-foreground">{post.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Post Content */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12 ring-2 ring-value2 ring-offset-2">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {post.author.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-primary text-lg">{post.author.name}</h3>
                      <Badge variant="outline" className="bg-gradient-to-r from-value2 to-value1 border-0">
                        {post.author.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.createdAt}
                      <span>•</span>
                      <Tag className="w-3 h-3" />
                      {post.category}
                      <span>•</span>
                      <Eye className="w-3 h-3" />
                      {post.views} views
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-primary leading-tight">{post.title}</h1>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gradient-to-r from-value2 to-value1 text-primary hover:from-secondary hover:to-primary hover:text-white transition-all duration-200"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{post.content}</div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-value2/50">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    onClick={handleLike}
                    className={`gap-2 hover:bg-danger/10 transition-all duration-200 ${
                      post.isLiked ? "text-danger bg-danger/10" : "text-muted-foreground"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes} likes
                  </Button>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-5 h-5" />
                    {post.comments} comments
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    {Math.floor(post.views / 10)} engaged
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={handleBookmark}
                    className={`hover:bg-accent/10 transition-all duration-200 ${
                      post.isBookmarked ? "text-accent bg-accent/10" : "text-muted-foreground"
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Comments ({comments.length})
                </h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 ring-2 ring-value2 ring-offset-1">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      Y
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts or ask a question..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px] resize-none border-value2/50 focus:border-secondary bg-white/50"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                          <Smile className="w-4 h-4" />
                          Emoji
                        </Button>
                      </div>
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <CommentComponent key={comment.id} comment={comment} />
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-primary">No comments yet</h3>
                  <p className="text-muted-foreground">Be the first to share your thoughts!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
