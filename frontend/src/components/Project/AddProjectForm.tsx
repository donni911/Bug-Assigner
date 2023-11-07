import { formatTechnologies } from "../../data/technologies";
import { useAddProjectMutation } from "../../store/api/injections/projects.ts";

import { Box, Heading, useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { formValues } from "./helpers/form.ts";
import ProjectForm from "./components/ProjectForm.tsx";

const AddProjectForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [addProject, { isLoading, error }] = useAddProjectMutation();

  const formValues: formValues = {
    title: "",
    description: "",
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
        values.technologies = formatTechnologies(values?.technologies);
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
      <ProjectForm
        initialValues={formValues}
        isLoading={isLoading}
        onSubmitForm={submitForm}
      />
    </Box>
  );
};

export default AddProjectForm;
