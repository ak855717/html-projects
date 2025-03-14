import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Meme, MemeCategory } from "@/types/meme"

export const memeApi = createApi({
  reducerPath: "memeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.imgflip.com/" }),
  endpoints: (builder) => ({
    getMemes: builder.query<Meme[], void>({
      query: () => "get_memes",
      transformResponse: (response: { data: { memes: Meme[] } }) => {
        return response.data.memes.map((meme) => ({
          ...meme,
          likes: Math.floor(Math.random() * 10000),
          comments: Math.floor(Math.random() * 100),
          category: ["Trending", "New", "Classic", "Random"][Math.floor(Math.random() * 4)] as MemeCategory,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        }))
      },
    }),
    getMemeById: builder.query<Meme, string>({
      query: (id) => `get_memes`,
      transformResponse: (response: { data: { memes: Meme[] } }, _, id) => {
        const meme = response.data.memes.find((m) => m.id === id)
        if (!meme) throw new Error("Meme not found")

        return {
          ...meme,
          likes: Math.floor(Math.random() * 10000),
          comments: Math.floor(Math.random() * 100),
          category: ["Trending", "New", "Classic", "Random"][Math.floor(Math.random() * 4)] as MemeCategory,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        }
      },
    }),
  }),
})

export const { useGetMemesQuery, useGetMemeByIdQuery } = memeApi

