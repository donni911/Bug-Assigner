import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./apiBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: apiBaseQuery("http://localhost:9001/api"),
  endpoints: () => ({})
});