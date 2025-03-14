import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { memeApi } from "./services/meme-api"
import memesReducer from "./features/memes-slice"
import userReducer from "./features/user-slice"

export const store = configureStore({
  reducer: {
    [memeApi.reducerPath]: memeApi.reducer,
    memes: memesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(memeApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

