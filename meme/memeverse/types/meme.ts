export type MemeCategory = "Trending" | "New" | "Classic" | "Random"

export interface Meme {
  id: string
  name: string
  url: string
  width: number
  height: number
  box_count?: number
  captions?: number
  likes?: number
  comments?: number
  category?: MemeCategory
  createdAt?: string
  caption?: string
  userId?: string
  userName?: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  text: string
  createdAt: string
}

export interface SortOption {
  label: string
  value: "likes" | "date" | "comments"
}

export interface FilterOption {
  label: string
  value: MemeCategory | "All"
}

