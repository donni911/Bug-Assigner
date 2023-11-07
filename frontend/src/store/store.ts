import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/index.js'

export default configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware)
})