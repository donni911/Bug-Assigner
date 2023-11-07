import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Text,
  HStack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { Formik, Field, FieldArray } from "formik";
import { Form } from "react-router-dom";
import { technologiesValues } from "../../../data/technologies";
import { ProjectSchema } from "../helpers/form";

type Props = {
  initialValues: object;
  isLoading: boolean;
  onSubmitForm: () => void;
};

const ProjectForm = ({ initialValues, isLoading, onSubmitForm }: Props) => {
  return (
    <Formik
      validationSchema={ProjectSchema}
      onSubmit={onSubmitForm}
      initialValues={initialValues}
    >
      {({ handleSubmit, errors, touched, values }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl mb="4" isInvalid={!!errors.title && touched.title}>
            <FormLabel htmlFor="title" fontWeight={"normal"}>
              Name of your Project
            </FormLabel>
            <Field as={Input} id="title" name="title" placeholder="Title" />
            {errors.title && touched.title ? (
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl
            mb="4"
            isInvalid={!!errors.description && touched.description}
          >
            <FormLabel htmlFor="description" fontWeight={"normal"}>
              Describe your project
            </FormLabel>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Description"
            />
            {values.description.length > 0 && (
              <Text textAlign={"end"} color="gray.400">
                {values.description.length}
              </Text>
            )}
            {errors.description && touched.description ? (
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl
            isInvalid={!!errors.technologies && touched.technologies}
          >
            <FormLabel htmlFor="technologies" fontWeight={"normal"}>
              Choose your technologies
            </FormLabel>
            <FieldArray
              key="technologies"
              name="technologies"
              render={() => (
                <HStack gap={4} flexWrap={"wrap"}>
                  {technologiesValues.map((technologie) => {
                    return (
                      <FormLabel
                        cursor={"pointer"}
                        htmlFor={technologie.value}
                        display={"flex"}
                        gap={4}
                        key={technologie.value}
                      >
                        <Field
                          as={Checkbox}
                          colorScheme="gray"
                          id={technologie.value}
                          name="technologies"
                          type="checkbox"
                          value={technologie.value}
                          defaultChecked={initialValues.technologies.some(
                            (el) => (technologie.value === el ? true : false)
                          )}
                        ></Field>
                        <Text>{technologie.name}</Text>
                      </FormLabel>
                    );
                  })}
                </HStack>
              )}
            />
            {errors.technologies && touched.technologies ? (
              <FormErrorMessage>{errors.technologies}</FormErrorMessage>
            ) : null}
          </FormControl>
          <Button
            mt={4}
            type="submit"
            variant={"primary"}
            w={"full"}
            isLoading={isLoading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
