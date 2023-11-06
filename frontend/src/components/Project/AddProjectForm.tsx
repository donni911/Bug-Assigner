import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addProject } from "../../store/slices/projects";
import { technologieValues } from "../../data/technologies";

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
import { RootState } from "../../store/store";

type formValues = {
  title: string;
  description: string;
  technologies: string[];
};

const ModalProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading, errors } = useSelector(
    (state: RootState) => state.entities.projects
  );

  const formValues: formValues = {
    title: "Project",
    description:
      "Very long description about project of all project chizzaaaz all project chizzaaaz all project chizzaaaz",
    technologies: [],
  };

  const ProjectSchema = Yup.object().shape({
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

  const submitForm = async (values: formValues) => {
    try {
      await dispatch(addProject(values));

      if (errors) {
        toast({
          title: `Something went wrong.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
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
                    {technologieValues.map((technologie) => {
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
                            value={technologie.name}
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
              isLoading={loading}
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

export default ModalProject;
