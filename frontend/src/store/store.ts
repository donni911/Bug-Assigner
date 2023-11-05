// Store config
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer.js";


import api from "./middleware/api.ts";

// const store = () => configureStore({
//   reducer,
//   middleware: [...getDefaultMiddleware(), api],
// });

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), api],
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
