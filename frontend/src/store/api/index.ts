import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./apiBaseQuery";
import { Bug } from "../../types/Bug";
import { Project } from "../../types/Project";
import { Form } from "@savks/react-forms";

type ResponseDataBugs = Bug[] | [] | undefined;
type ResponseDataProjects = Project[] | [] | undefined;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: apiBaseQuery("http://localhost:9001/api"),
  tagTypes: ['projects', 'bugs', 'project-bugs'],
  endpoints: (builder) => ({
    // BUGS ENDPOINTS
    getBugs: builder.query<ResponseDataBugs, void>({
      query: () => ({ url: "/bugs", method: "GET" }),
      providesTags: ['bugs']
    }),
    // BUGS END ENDPOINTS

    // PROJECT-BUGS ENDPOINTs
    addBug: builder.mutation({
      query: bug => ({
        url: '/bugs',
        method: 'POST',
        data: bug
      }),
      invalidatesTags: ['project-bugs'],
    }),

    updateBug: builder.mutation<void, Form>({
      query: formData => ({
        url: `/bugs/${formData.data._id}`,
        method: "PATCH",
        data: formData
      }),
      invalidatesTags: ['project-bugs']
    }),

    // resolveBug :builder.mutation<void,boolean>({
    //   query: formData => ({
    //     url: `/bugs/${formData.data._id}`,
    //     method: "PATCH",
    //     data: formData
    //   }),
    //   invalidatesTags: ['project-bugs']
    // }),

    deleteBug: builder.mutation<void, string>({
      query: (id) =>
      ({
        url: `/bugs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['project-bugs']
    }),

    getProjectBugsById: builder.query({
      query: (id) => ({
        url: `projects/${id}/bugs`,
        method: 'GET',
      }),
      providesTags: ['project-bugs']
    }),
    // PROJECT-BUGS END ENDPOINTS

    // PROJECTS ENDPOINTS
    getProjects: builder.query<ResponseDataProjects, void>({
      query: () => ({ url: '/projects', method: 'GET' }),
      providesTags: ['projects']
    }),

    getProject: builder.query<Project, {
      slug: string
    }>({
      query: (slug) => ({ url: `/projects/${slug}`, method: 'GET' }),
      providesTags: ['projects']
    }),

    addProject: builder.mutation({
      query: project => ({
        url: '/projects',
        method: 'POST',
        data: project
      }),
      invalidatesTags: ['projects']
    }),

    updateProject: builder.mutation<void, {
      slug?: string | undefined,
      form: Form
    }>({
      query: ({ slug, form }) => ({
        url: `/projects/${slug}`,
        method: "PATCH",
        data: form
      }),
      invalidatesTags: ['project-bugs']
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['projects']
    }),
    // PROJECTS END ENPOINT
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery,
  useDeleteProjectMutation,
  useGetProjectBugsByIdQuery,
  useAddBugMutation,
  useUpdateBugMutation,
  useDeleteBugMutation,
  useGetBugsQuery
}
  = baseApi;