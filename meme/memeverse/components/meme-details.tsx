"use client"

import { useState } from "react"
import Image from "next/image"
import { useGetMemeByIdQuery } from "@/lib/services/meme-api"
import { useDispatch, useSelector } from "react-redux"
import { toggleLike, selectLikedMemes, addComment, selectMemeComments } from "@/lib/features/memes-slice"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { formatNumber } from "@/lib/utils"
import type { Comment } from "@/types/meme"
import { Heart, MessageCircle, Share2, Send } from "lucide-react"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"

interface MemeDetailsProps {
  id: string
}

export function MemeDetails({ id }: MemeDetailsProps) {
  const { data: meme, isLoading, error } = useGetMemeByIdQuery(id)
  const dispatch = useDispatch()
  const likedMemes = useSelector(selectLikedMemes)
  const comments = useSelector((state) => selectMemeComments(state, id))
  const [newComment, setNewComment] = useState("")
  const isLiked = likedMemes[id] || false

  const handleLike = () => {
    dispatch(toggleLike(id))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: meme?.name || "Check out this meme",
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: uuidv4(),
      userId: "current-user",
      userName: "You",
      text: newComment,
      createdAt: new Date().toISOString(),
    }

    dispatch(addComment({ memeId: id, comment }))
    setNewComment("")
  }

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square md:aspect-auto md:h-[500px] w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-4 py-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-10 ml-auto" />
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    )
  }

  if (error || !meme) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <p className="text-muted-foreground">Failed to load meme. It might not exist or there was an error.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden">
          <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full">
            <Image
              src={meme.url || "/placeholder.svg"}
              alt={meme.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        <h1 className="text-2xl font-bold md:text-3xl">{meme.name}</h1>
        {meme.caption && <p className="text-muted-foreground">{meme.caption}</p>}

        <div className="flex items-center gap-4 py-4 border-y">
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleLike}>
            <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />
            <span>{formatNumber(meme.likes || 0)}</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>{formatNumber(comments.length || 0)}</span>
          </Button>
          <Button variant="outline" size="icon" className="ml-auto" onClick={handleShare}>
            <Share2 size={18} />
            <span className="sr-only">Share</span>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddComment()
              }}
            />
            <Button size="icon" onClick={handleAddComment}>
              <Send size={18} />
              <span className="sr-only">Send</span>
            </Button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1">{comment.text}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

