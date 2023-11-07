import * as Yup from "yup";
import { Technologie } from "../../../data/technologies";

export type formValues = {
    title: string;
    description: string;
    technologies: Technologie[] | undefined;
};

export const ProjectSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Too Short Title!")
        .max(50, "Too Long Title!")
        .required("Required field"),
    description: Yup.string()
        .min(30, "Too Short Description (min 30 character`s)")
        .required("Required field"),
    technologies: Yup.array()
        .min(2, "Should be at least 2 technologies choosed")
        .required("Choose at least one technologie"),
});