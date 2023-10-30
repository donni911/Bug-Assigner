// Store config

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer.js";

import api from "./middleware/api.js";
import toast from "./middleware/toast.js";
import logger from "./middleware/logger.js";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      toast,
      api,
    ],
  });
}
