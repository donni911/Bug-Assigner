import { z } from "zod";

export const bugSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be maximum of 30 characters long." }),
  description: z
    .string()
    .min(15, { message: "Must be 15 or more characters long" }),
  priority: z.string().min(1, { message: "Must be priority choosed" }),
});
