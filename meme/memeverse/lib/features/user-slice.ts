import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"

interface UserProfile {
  name: string
  bio: string
  avatarUrl: string
}

interface UserState {
  profile: UserProfile
}

// Initialize state from localStorage if available
const getInitialState = (): UserState => {
  if (typeof window === "undefined") {
    return {
      profile: {
        name: "Meme Lover",
        bio: "Just here for the laughs!",
        avatarUrl: "/placeholder.svg?height=100&width=100",
      },
    }
  }

  try {
    const profile = JSON.parse(
      localStorage.getItem("userProfile") ||
        JSON.stringify({
          name: "Meme Lover",
          bio: "Just here for the laughs!",
          avatarUrl: "/placeholder.svg?height=100&width=100",
        }),
    )

    return { profile }
  } catch (error) {
    console.error("Error parsing localStorage:", error)
    return {
      profile: {
        name: "Meme Lover",
        bio: "Just here for the laughs!",
        avatarUrl: "/placeholder.svg?height=100&width=100",
      },
    }
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userProfile", JSON.stringify(state.profile))
      }
    },
  },
})

export const { updateProfile } = userSlice.actions

// Selectors
export const selectUserProfile = (state: RootState) => state.user.profile

export default userSlice.reducer

