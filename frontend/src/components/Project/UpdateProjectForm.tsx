import { useUpdateProjectMutation } from "../../store/api/injections/projects.ts";

import { Box, Heading, useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project.ts";

import ProjectForm from "./components/ProjectForm.tsx";
import { Form, FormWrap, useForm } from "@savks/react-forms";
import { showErrorMessage, showSuccessMessage } from "./helpers/toast.ts";
import { useEffect } from "react";

const UpdateProjectForm = (props: { project: Project }) => {
  const form = useForm({
    title: props.project.title,
    description: props.project.description,
    technologies: props.project.technologies,
  });

  const toast = useToast();
  const navigate = useNavigate();
  const [updateProject, { isLoading, isError, isSuccess }] =
    useUpdateProjectMutation();

  useEffect(() => {
    if (isError) {
      showErrorMessage(toast);
    } else if (isSuccess) {
      showSuccessMessage(toast, `Project ${form?.data.title} was updated.`);
      navigate(`/projects/${props.project.slug}`);
    }
  }, [isError, isSuccess]);

  const submitForm = (form: Form) => {
    updateProject({ slug: props.project.slug, form });
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
