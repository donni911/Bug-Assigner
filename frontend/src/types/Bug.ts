export type Bug = {
    _id: string,
    title: string,
    description: string,
    resolved?: boolean,
    projectId?: string,
    userId?: string
}