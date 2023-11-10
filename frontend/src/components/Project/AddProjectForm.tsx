import { useAddProjectMutation } from "@/store/api/index.ts";
import { Box, Heading } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import ProjectForm from "./components/ProjectForm.tsx";
import { Form, FormWrap, useForm } from "@savks/react-forms";
import { useEffect } from "react";
import { showErrorMessage, showSuccessMessage } from "./helpers/toast.ts";
import { useToast } from "@chakra-ui/react";

const AddProjectForm = () => {
  const form = useForm({
    title: "",
    description: "",
    technologies: [],
  });

  const toast = useToast();
  const navigate = useNavigate();
  const [addProject, { isLoading, isError, isSuccess }] =
    useAddProjectMutation();

  useEffect(() => {
    if (isError) {
      showErrorMessage(toast);
    } else if (isSuccess) {
      showSuccessMessage(toast, `Project ${form?.data.title} was created.`);
      navigate("/");
    }
  }, [isError, isSuccess]);

  const submitForm = (form: Form) => {
    addProject(form);
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
