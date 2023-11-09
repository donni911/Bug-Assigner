import { z } from "zod";

export const bugSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be maximum of 30 characters long." }),
  description: z
    .string()
    .min(15, { message: "Must be 15 or more characters long" }),
  priority: z.enum(["low", "medium", "high"]),
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(422).send({
      statusCode: 422,
      message: "Unprocessable Entity",
      errors: error.errors.reduce((carry, error) => {
        for (const path of error.path) {
          const messages = carry[path.toString()] ?? [];

          messages.push(error.message);

          carry[path.toString()] = messages;
        }

        return carry;
      }, {}),
    });
  }
};
