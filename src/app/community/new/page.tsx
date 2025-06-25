"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Code,
  HelpCircle,
  MessageCircle,
  Plus,
  X,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  Hash,
  Lightbulb,
  AlertCircle,
  Sparkles,
} from "lucide-react"

interface PostDraft {
  type: "discussion" | "project" | "help"
  title: string
  content: string
  category: string
  tags: string[]
  isDraft: boolean
}

const categories = {
  discussion: [
    "General Discussion",
    "Best Practices",
    "Architecture",
    "Performance",
    "Career Advice",
    "Learning Resources",
  ],
  project: [
    "Web Development",
    "Mobile Apps",
    "Desktop Applications",
    "APIs & Backend",
    "DevOps & Infrastructure",
    "AI/ML Projects",
  ],
  help: ["Debugging", "Code Review", "Deployment Issues", "Database Problems", "Authentication", "Performance Issues"],
}

const popularTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Python",
  "Database",
  "API",
  "CSS",
  "Tailwind",
  "MongoDB",
  "PostgreSQL",
  "Authentication",
  "Deployment",
  "Performance",
  "Testing",
]

export default function NewPostPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [post, setPost] = useState<PostDraft>({
    type: "discussion",
    title: "",
    content: "",
    category: "",
    tags: [],
    isDraft: false,
  })
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = (tag: string) => {
    if (tag && !post.tags.includes(tag) && post.tags.length < 8) {
      setPost({ ...post, tags: [...post.tags, tag] })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      handleAddTag(tagInput.trim())
    }
  }

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isDraft) {
      // Save as draft logic
      console.log("Saved as draft:", post)
    } else {
      // Publish post logic
      console.log("Published post:", post)
      router.push("/community")
    }
    setIsSubmitting(false)
  }

  const insertMarkdown = (syntax: string, placeholder = "") => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const replacement = selectedText || placeholder

    let newText = ""
    switch (syntax) {
      case "bold":
        newText = `**${replacement}**`
        break
      case "italic":
        newText = `*${replacement}*`
        break
      case "link":
        newText = `[${replacement || "link text"}](url)`
        break
      case "code":
        newText = `\`${replacement}\``
        break
      case "quote":
        newText = `> ${replacement}`
        break
      case "list":
        newText = `- ${replacement}`
        break
      case "ordered-list":
        newText = `1. ${replacement}`
        break
      case "heading":
        newText = `## ${replacement}`
        break
      default:
        newText = replacement
    }

    const newContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end)
    setPost({ ...post, content: newContent })

    // Focus and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + newText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Code className="w-5 h-5" />
      case "help":
        return <HelpCircle className="w-5 h-5" />
      default:
        return <MessageCircle className="w-5 h-5" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "project":
        return "from-accent to-accent/80"
      case "help":
        return "from-info to-info/80"
      default:
        return "from-secondary to-secondary/80"
    }
  }

  const renderPreview = () => {
    if (!post.content) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Start writing to see a preview of your post</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Preview Header */}
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12 ring-2 ring-value2 ring-offset-2">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="You" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">Y</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-primary">You</span>
              <Badge variant="outline" className="bg-value2/50 border-0">
                Student
              </Badge>
              <span className="text-sm text-muted-foreground">Just now</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 bg-gradient-to-r ${getPostTypeColor(post.type)} rounded-lg`}>
                {getPostTypeIcon(post.type)}
              </div>
              <span className="text-sm text-muted-foreground">{post.category || "Select a category"}</span>
            </div>
          </div>
        </div>

        {/* Preview Title */}
        <h1 className="text-3xl font-bold text-primary">{post.title || "Your post title will appear here"}</h1>

        {/* Preview Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gradient-to-r from-value2 to-value1 text-primary">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Preview Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{post.content}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-value3 via-white to-value3">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-value2/50 sticky top-16 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Community
              </Button>
              <div className="h-6 w-px bg-value2"></div>
              <div className="flex items-center gap-2">
                <div className={`p-2 bg-gradient-to-r ${getPostTypeColor(post.type)} rounded-lg`}>
                  {getPostTypeIcon(post.type)}
                </div>
                <span className="font-semibold text-primary">Create New Post</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting || !post.title.trim()}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !post.title.trim() || !post.content.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Post Type Selection */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                What would you like to share?
              </CardTitle>
              <CardDescription>Choose the type of post that best fits your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    type: "discussion" as const,
                    title: "Discussion",
                    description: "Start a conversation or share insights",
                    icon: MessageCircle,
                    color: "from-secondary to-secondary/80",
                  },
                  {
                    type: "project" as const,
                    title: "Project Showcase",
                    description: "Share your latest project or creation",
                    icon: Code,
                    color: "from-accent to-accent/80",
                  },
                  {
                    type: "help" as const,
                    title: "Help & Support",
                    description: "Ask for help or technical assistance",
                    icon: HelpCircle,
                    color: "from-info to-info/80",
                  },
                ].map(({ type, title, description, icon: Icon, color }) => (
                  <Card
                    key={type}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      post.type === type
                        ? "ring-2 ring-primary bg-gradient-to-br from-primary/5 to-secondary/5"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setPost({ ...post, type, category: "" })}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-primary mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Post Details */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Provide the basic information for your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title for your post..."
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="text-lg font-medium border-value2/50 focus:border-secondary"
                />
                <p className="text-xs text-muted-foreground">{post.title.length}/100 characters</p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category *
                </Label>
                <Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })}>
                  <SelectTrigger className="border-value2/50 focus:border-secondary">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[post.type].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tags</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="border-value2/50 focus:border-secondary"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddTag(tagInput.trim())}
                      disabled={!tagInput.trim() || post.tags.includes(tagInput.trim()) || post.tags.length >= 8}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Current Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-gradient-to-r from-value2 to-value1 text-primary gap-1"
                        >
                          #{tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Popular Tags */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Popular tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {popularTags.slice(0, 12).map((tag) => (
                        <Button
                          key={tag}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddTag(tag)}
                          disabled={post.tags.includes(tag) || post.tags.length >= 8}
                          className="h-7 text-xs text-muted-foreground hover:text-primary hover:bg-value3/50"
                        >
                          <Hash className="w-3 h-3 mr-1" />
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{post.tags.length}/8 tags added</p>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>Write your post content using Markdown formatting</CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "write" | "preview")}>
                  <TabsList className="bg-value3/50">
                    <TabsTrigger value="write" className="gap-2">
                      <Bold className="w-4 h-4" />
                      Write
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "write" | "preview")}>
                <TabsContent value="write" className="space-y-4">
                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 bg-value3/30 rounded-lg border border-value2/30">
                    {[
                      { icon: Bold, action: "bold", tooltip: "Bold" },
                      { icon: Italic, action: "italic", tooltip: "Italic" },
                      { icon: Link, action: "link", tooltip: "Link" },
                      { icon: Quote, action: "quote", tooltip: "Quote" },
                      { icon: List, action: "list", tooltip: "Bullet List" },
                      { icon: ListOrdered, action: "ordered-list", tooltip: "Numbered List" },
                      { icon: Hash, action: "heading", tooltip: "Heading" },
                    ].map(({ icon: Icon, action, tooltip }) => (
                      <Button
                        key={action}
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown(action, tooltip.toLowerCase())}
                        className="h-8 w-8 p-0 hover:bg-white/50"
                        title={tooltip}
                      >
                        <Icon className="w-4 h-4" />
                      </Button>
                    ))}
                    <div className="w-px h-6 bg-value2/50 mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50" title="Add Image">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50" title="Attach File">
                      <Link className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Content Textarea */}
                  <Textarea
                    name="content"
                    placeholder="Share your thoughts, code, questions, or project details here...

You can use Markdown formatting:
- **bold text**
- *italic text*
- [links](url)
- `code`
- > quotes
- # headings

Be descriptive and helpful to get the best engagement from the community!"
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    className="min-h-[400px] resize-none border-value2/50 focus:border-secondary font-mono text-sm leading-relaxed"
                  />

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{post.content.length} characters</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        <span>Tip: Use markdown for better formatting</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="min-h-[400px] p-6 bg-gradient-to-br from-value3/20 to-white rounded-lg border border-value2/30">
                    {renderPreview()}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-info/5 to-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertCircle className="w-5 h-5" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-primary mb-2">✅ Do:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Be respectful and constructive</li>
                    <li>• Provide clear, detailed descriptions</li>
                    <li>• Use relevant tags and categories</li>
                    <li>• Share code snippets when helpful</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-danger mb-2">❌ Dont:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Post spam or promotional content</li>
                    <li>• Share personal information</li>
                    <li>• Use offensive language</li>
                    <li>• Post duplicate questions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
