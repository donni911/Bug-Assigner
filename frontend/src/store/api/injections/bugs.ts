// import { Bug } from '../../../types/Bug.ts'
// import { baseApi } from '../index.ts'

// type ResponseData = Bug[] | [] | undefined;

// const extendedBugsApi = baseApi.enhanceEndpoints({
//   addTagTypes: ['bug'],
// }).injectEndpoints({
//   endpoints: (builder) => ({
//     getBugs: builder.query<ResponseData, void>({
//       query: () => ({ url: "/bugs", method: "GET" }),
//       providesTags: ['bug']
//     }),

//     // getBug: builder.query<ResponseData, string>({
//     //   query: (id) => (
//     //     { url: `/projects/${id}`, method: "GET" }),
//     // }),

//     addBug: builder.mutation({
//       query: bug => ({
//         url: '/bugs',
//         method: 'POST',
//         data: bug
//       }),
//       invalidatesTags: ['bug'],
//     }),
//     updateBug: builder.mutation({
//       query: bug => ({
//         url: `/bugs/${bug.id}`,
//         method: "PATCH",
//         data: bug
//       }),
//       invalidatesTags: ['bug']
//     }),
//     deleteBug: builder.mutation<void, string>({
//       query: (id) => {
//         console.log(id);
//         return ({
//           url: `/bugs/${id}`,
//           method: "DELETE",
//         })
//       },
//       invalidatesTags: ['bug']
//     })
//   }),
//   overrideExisting: false,
// })

// export const { useAddBugMutation, useUpdateBugMutation, useDeleteBugMutation, useGetBugsQuery } = extendedBugsApi