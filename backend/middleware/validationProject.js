import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be maximum of 30 characters long." }),
  description: z
    .string()
    .min(30, { message: "Must be 30 or more characters long" }),
  technologies: z.string().array().min(2),
});