import { Form } from '@savks/react-forms';
import { Project } from '../../../types/Project.ts';
import { baseApi } from '../index.ts'

type ResponseData = Project[] | [] | undefined;

const extendedProjectsApi = baseApi.enhanceEndpoints({
    addTagTypes: ['projects'],
}).injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<ResponseData, void>({
            query: () => ({ url: '/projects', method: 'get' }),
            providesTags: ['projects']
        }),
        getProject: builder.query<Project, {
            slug: string
        }>({
            query: (slug) => ({ url: `/projects/${slug}`, method: 'get' }),
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
            invalidatesTags: ['projects']
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['projects']

        })
    }),
    overrideExisting: false,
})

export const { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useGetProjectQuery, useDeleteProjectMutation } = extendedProjectsApi;