
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
