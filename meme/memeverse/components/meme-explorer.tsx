"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useGetMemesQuery } from "@/lib/services/meme-api"
import { MemeCard } from "@/components/meme-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Meme, SortOption, FilterOption } from "@/types/meme"
import { debounce } from "@/lib/utils"
import { Search, SlidersHorizontal } from "lucide-react"

const sortOptions: SortOption[] = [
  { label: "Most Liked", value: "likes" },
  { label: "Newest", value: "date" },
  { label: "Most Comments", value: "comments" },
]

const filterOptions: FilterOption[] = [
  { label: "All", value: "All" },
  { label: "Trending", value: "Trending" },
  { label: "New", value: "New" },
  { label: "Classic", value: "Classic" },
  { label: "Random", value: "Random" },
]

export function MemeExplorer() {
  const { data: memes, isLoading } = useGetMemesQuery()
  const [filteredMemes, setFilteredMemes] = useState<Meme[]>([])
  const [visibleMemes, setVisibleMemes] = useState<Meme[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<SortOption["value"]>("likes")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const ITEMS_PER_PAGE = 12

  // Filter and sort memes based on search, category, and sort option
  useEffect(() => {
    if (!memes) return

    let result = [...memes]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((meme) => meme.name.toLowerCase().includes(query))
    }

    // Apply category filter
    if (category !== "All") {
      result = result.filter((meme) => meme.category === category)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "likes") {
        return (b.likes || 0) - (a.likes || 0)
      } else if (sortBy === "comments") {
        return (b.comments || 0) - (a.comments || 0)
      } else if (sortBy === "date") {
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
      }
      return 0
    })

    setFilteredMemes(result)
    setPage(1)
    setHasMore(result.length > ITEMS_PER_PAGE)
    setVisibleMemes(result.slice(0, ITEMS_PER_PAGE))
  }, [memes, searchQuery, category, sortBy])

  // Load more memes when scrolling
  const loadMoreMemes = useCallback(() => {
    if (!filteredMemes || isLoading) return

    const nextPage = page + 1
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const newMemes = filteredMemes.slice(startIndex, endIndex)

    if (newMemes.length > 0) {
      setVisibleMemes((prev) => [...prev, ...newMemes])
      setPage(nextPage)
      setHasMore(endIndex < filteredMemes.length)
    } else {
      setHasMore(false)
    }
  }, [filteredMemes, page, isLoading])

  // Set up intersection observer for infinite scrolling
  const lastMemeRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreMemes()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore, loadMoreMemes],
  )

  // Debounced search handler
  const handleSearch = debounce((value: string) => {
    setSearchQuery(value)
  }, 300)

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="meme-card">
              <Skeleton className="aspect-square sm:aspect-video w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search memes..." className="pl-9" onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full sm:w-40">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption["value"])}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visibleMemes.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">No memes found. Try a different search or filter.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setCategory("All")
              setSortBy("likes")
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleMemes.map((meme, index) => {
            if (index === visibleMemes.length - 1) {
              return (
                <div key={meme.id} ref={lastMemeRef}>
                  <MemeCard meme={meme} />
                </div>
              )
            } else {
              return <MemeCard key={meme.id} meme={meme} />
            }
          })}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      )}
    </div>
  )
}

