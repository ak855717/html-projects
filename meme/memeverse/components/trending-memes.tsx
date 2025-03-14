"use client"

import { useGetMemesQuery } from "@/lib/services/meme-api"
import { MemeCard } from "@/components/meme-card"
import { Skeleton } from "@/components/ui/skeleton"

export function TrendingMemes() {
  const { data: memes, isLoading, error } = useGetMemesQuery()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="meme-card">
            <Skeleton className="aspect-square sm:aspect-video w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-muted-foreground">Failed to load trending memes. Please try again later.</p>
      </div>
    )
  }

  // Filter to show only trending memes and limit to 6
  const trendingMemes = memes?.filter((meme) => meme.category === "Trending" || meme.likes! > 5000).slice(0, 6)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {trendingMemes?.map((meme) => (
        <MemeCard key={meme.id} meme={meme} priority />
      ))}
    </div>
  )
}

