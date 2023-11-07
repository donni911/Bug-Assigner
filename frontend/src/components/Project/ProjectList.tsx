import { SimpleGrid, Text } from "@chakra-ui/react";

import { Project } from "../../types/Project.ts";

import { useGetProjectsQuery } from "../../store/api/injections/projects.ts";

import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./components/ProjectCardSkeleton";

const ProjectList = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();

  const skeletons = [1, 2, 3, 4];
  if (!isFetching && !projects?.length) {
    return <Text>No Projects yet, want to add some?</Text>;
  } else {
    return (
      <SimpleGrid w="100%" columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
        {!isFetching &&
          projects &&
          projects?.map((project: Project) => (
            <ProjectCard
              key={project._id}
              _id={project._id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              slug={project.slug}
            />
          ))}
        {isFetching &&
          skeletons.map((skeleton) => (
            <ProjectCardSkeleton key={skeleton}></ProjectCardSkeleton>
          ))}
      </SimpleGrid>
    );
  }
};

export default ProjectList;
