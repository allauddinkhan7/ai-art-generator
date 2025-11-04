import { configureStore } from '@reduxjs/toolkit'
import artReducer from './features/artSlice'

export const store = configureStore({
  reducer: {
    art: artReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch