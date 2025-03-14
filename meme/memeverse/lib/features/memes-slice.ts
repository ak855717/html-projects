import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Meme, Comment } from "@/types/meme"
import type { RootState } from "@/lib/store"

interface MemesState {
  likedMemes: Record<string, boolean>
  userMemes: Meme[]
  comments: Record<string, Comment[]>
}

// Initialize state from localStorage if available
const getInitialState = (): MemesState => {
  if (typeof window === "undefined") {
    return {
      likedMemes: {},
      userMemes: [],
      comments: {},
    }
  }

  try {
    const likedMemes = JSON.parse(localStorage.getItem("likedMemes") || "{}")
    const userMemes = JSON.parse(localStorage.getItem("userMemes") || "[]")
    const comments = JSON.parse(localStorage.getItem("comments") || "{}")

    return {
      likedMemes,
      userMemes,
      comments,
    }
  } catch (error) {
    console.error("Error parsing localStorage:", error)
    return {
      likedMemes: {},
      userMemes: [],
      comments: {},
    }
  }
}

const memesSlice = createSlice({
  name: "memes",
  initialState: getInitialState(),
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const memeId = action.payload
      state.likedMemes[memeId] = !state.likedMemes[memeId]

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("likedMemes", JSON.stringify(state.likedMemes))
      }
    },
    addUserMeme: (state, action: PayloadAction<Meme>) => {
      state.userMemes.push(action.payload)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userMemes", JSON.stringify(state.userMemes))
      }
    },
    addComment: (state, action: PayloadAction<{ memeId: string; comment: Comment }>) => {
      const { memeId, comment } = action.payload
      if (!state.comments[memeId]) {
        state.comments[memeId] = []
      }
      state.comments[memeId].push(comment)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("comments", JSON.stringify(state.comments))
      }
    },
  },
})

export const { toggleLike, addUserMeme, addComment } = memesSlice.actions

// Selectors
export const selectLikedMemes = (state: RootState) => state.memes.likedMemes
export const selectUserMemes = (state: RootState) => state.memes.userMemes
export const selectComments = (state: RootState) => state.memes.comments
export const selectMemeComments = (state: RootState, memeId: string) => state.memes.comments[memeId] || []

export default memesSlice.reducer

