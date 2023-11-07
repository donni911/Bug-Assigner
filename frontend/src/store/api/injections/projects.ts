import { Project } from '../../../types/Project.ts';
import { baseApi } from '../index.ts'

type ResponseData = Project[] | [] | undefined;


const extendedProjectsApi = baseApi.enhanceEndpoints({
    addTagTypes: ['projects'],
}).injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<ResponseData, void>({
            query: () => "/projects",
            providesTags: ['projects']
        }),
        getProject: builder.query<ResponseData, string>({
            query: (projectSlug) => `/projects/${projectSlug}`,
        }),
        addProject: builder.mutation({
            query: project => ({
                url: '/projects',
                method: 'POST',
                body: project
            }),
            invalidatesTags: ['projects']
        }),
        updateProject: builder.mutation({
            query: project => ({
                url: `/projects/${project.slug}`,
                method: "PATCH",
                body: project
            })
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            })
        })
    }),
    overrideExisting: false,
})

export const { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useGetProjectQuery } = extendedProjectsApi;