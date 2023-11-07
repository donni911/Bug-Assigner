import { Bug } from '../../../types/Bug.ts'
import { baseApi } from '../index.ts'

type ResponseData = Bug[] | [] | undefined;

const extendedBugsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBugs: builder.query<ResponseData, void>({
      query: () => "/bugs",
    }),
    getBug: builder.query<ResponseData, string>({
      query: (id) => `/projects/${id}`,
    }),
    addBug: builder.mutation({
      query: bug => ({
        url: '/bugs',
        method: 'POST',
        body: bug
      }),
    }),
    updateBug: builder.mutation({
      query: bug => ({
        url: `/bugs/${bug.id}`,
        method: "PATCH",
        body: bug
      })
    }),
    deleteBug: builder.mutation({
      query: (id) => ({
        url: `/bugs/${id}`,
        method: "DELETE",
      })
    })
  }),
  overrideExisting: false,
})

export const { useAddBugMutation, useUpdateBugMutation, useDeleteBugMutation, useGetBugQuery, useGetBugsQuery } = extendedBugsApi