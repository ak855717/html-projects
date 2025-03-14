"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import type { Meme } from "@/types/meme"
import { formatNumber } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { toggleLike, selectLikedMemes } from "@/lib/features/memes-slice"
import { motion } from "framer-motion"

interface MemeCardProps {
  meme: Meme
  priority?: boolean
}

export function MemeCard({ meme, priority = false }: MemeCardProps) {
  const dispatch = useDispatch()
  const likedMemes = useSelector(selectLikedMemes)
  const isLiked = likedMemes[meme.id] || false
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    dispatch(toggleLike(meme.id))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: meme.name,
          url: `/meme/${meme.id}`,
        })
        .catch(console.error)
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/meme/${meme.id}`)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="meme-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="border-0 shadow-none overflow-hidden">
        <Link href={`/meme/${meme.id}`}>
          <div className="relative aspect-square sm:aspect-video overflow-hidden">
            <Image
              src={meme.url || "/placeholder.svg"}
              alt={meme.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-in-out"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              priority={priority}
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{meme.name}</h3>
          {meme.caption && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{meme.caption}</p>}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2" onClick={handleLike}>
              <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />
              <span>{formatNumber(meme.likes || 0)}</span>
            </Button>
            <Link href={`/meme/${meme.id}`}>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
                <MessageCircle size={18} />
                <span>{formatNumber(meme.comments || 0)}</span>
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleShare}>
            <Share2 size={18} />
            <span className="sr-only">Share</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

