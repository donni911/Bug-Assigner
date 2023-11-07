import { Formik, Field, Form, FieldArray } from "formik";

import { Technologie, technologiesValues } from "../../data/technologies";
import { useAddProjectMutation } from "../../store/api/injections/projects.ts";

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  FormErrorMessage,
  Textarea,
  Text,
  Heading,
  Checkbox,
  HStack,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ProjectSchema, formValues } from "./helpers/form.ts";

const AddProjectForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [addProject, { isLoading, error }] = useAddProjectMutation();

  const formValues: formValues = {
    title: "title  o k ok o k o k ok o k o k o k ",
    description:
      "title  o k ok o k o k ok o k o k o k title  o k ok o k o k ok o k o k o k title  o k ok o k o k ok o k o k o k title  o k ok o k o k ok o k o k o k title  o k ok o k o k ok o k o k o k ",
    technologies: [],
  };

  const submitForm = (values: formValues) => {
    try {
      if (error) {
        toast({
          title: `Something went wrong.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const tech: Technologie[] = [];

        values.technologies.forEach((techno) => {
          technologiesValues.find((el) => {
            if (el.value === techno) {
              tech.push(el);
            }
          });
        });

        values.technologies = tech;        

        addProject(values);
        toast({
          title: `Project ${values.title} was created.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mx={"auto"} maxWidth={"900px"}>
      <Heading mb={4} textAlign={"center"}>
        Add a new Project
      </Heading>
      <Formik
        validationSchema={ProjectSchema}
        onSubmit={submitForm}
        initialValues={formValues}
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
                  <HStack gap={4}>
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
    </Box>
  );
};

export default AddProjectForm;
