import { formatTechnologies } from "../../data/technologies";
import { useUpdateProjectMutation } from "../../store/api/injections/projects.ts";

import { Box, Heading, useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project.ts";
import { formValues } from "./helpers/form.ts";
import ProjectForm from "./components/ProjectForm.tsx";

type Props = {
  project: Project;
};

const AddProjectForm = ({ project }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [updateProject, { isLoading, error }] = useUpdateProjectMutation();

  const formValues: formValues = {
    title: project.title,
    description: project.description,
    technologies: project?.technologies?.map((el) => el?.value),
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

        updateProject({ slug: project.slug, ...values });

        toast({
          title: `Project ${values.title} was updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate(`/projects/${project.slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mx={"auto"} maxWidth={"900px"}>
      <Heading mb={4} textAlign={"center"}>
        Update {project.title}
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
