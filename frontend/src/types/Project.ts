import { Technologie } from "../data/technologies";

export type Project = {
    _id: string;
    title: string;
    description: string;
    slug?: string | undefined;
    technologies?: Technologie[];
}