import { useAddProjectMutation } from "../../store/api/injections/projects.ts";

import { Box, Heading, useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import ProjectForm from "./components/ProjectForm.tsx";
import { Form, FormWrap, useForm } from "@savks/react-forms";

const AddProjectForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [addProject, { isLoading, error }] = useAddProjectMutation();

  const form = useForm({
    title: "",
    description: "",
    technologies: [],
  });

  const submitForm = (form: Form) => {
    try {
      addProject(form);

      // TO SOLVE !!!
      if (error) {
        toast({
          title: `Something went wrong.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // toast({
        //   title: `Project ${form?.data.title} was created.`,
        //   status: "success",
        //   duration: 5000,
        //   isClosable: true,
        // });
        // navigate("/");
      }
    } catch (err) {}
  };

  return (
    <Box mx={"auto"} maxWidth={"900px"}>
      <Heading mb={4} textAlign={"center"}>
        Add a new Project
      </Heading>
      <FormWrap form={form} onSubmit={submitForm}>
        <ProjectForm isLoading={isLoading} />
      </FormWrap>
    </Box>
  );
};

export default AddProjectForm;
