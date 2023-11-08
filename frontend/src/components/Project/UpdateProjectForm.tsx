import { useUpdateProjectMutation } from "../../store/api/injections/projects.ts";

import { Box, Heading, useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project.ts";

import ProjectForm from "./components/ProjectForm.tsx";
import { Form, FormWrap, useForm } from "@savks/react-forms";

const UpdateProjectForm = (props: { project: Project }) => {
  const form = useForm({
    title: props.project.title,
    description: props.project.description,
    technologies: props.project.technologies,
  });

  const toast = useToast();
  const navigate = useNavigate();
  const [updateProject, { isLoading, error }] = useUpdateProjectMutation();

  const submitForm = (form: Form) => {
    updateProject({ slug: props.project.slug, form });

    // TO SOLVE!!!
    if (error) {
      toast({
        title: `Something went wrong.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Project ${props.project.title} was updated.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate(`/projects/${props.project.slug}`);
    }
  };

  return (
    <Box mx={"auto"} maxWidth={"900px"}>
      <Heading mb={4} textAlign={"center"}>
        Update {props.project.title}
      </Heading>
      <FormWrap form={form} onSubmit={submitForm}>
        <ProjectForm isLoading={isLoading} />
      </FormWrap>
    </Box>
  );
};

export default UpdateProjectForm;
