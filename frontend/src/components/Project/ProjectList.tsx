import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleGrid } from "@chakra-ui/react";

import { Project } from "../../types/Project.ts";
import { RootState } from "../../store/store.ts";

import { loadProjects } from "../../store/slices/projects.js";

import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./components/ProjectCardSkeleton";

const ProjectList = () => {
  const projects = useSelector(
    (state: RootState) => state.entities.projects.list
  );
  
  const loading = useSelector(
    (state: RootState) => state.entities.projects.loading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjects());

    return () => {};
  }, [dispatch]);

  const skeletons = [1, 2, 3, 4];

  return (
    <SimpleGrid w="100%" columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
      {projects &&
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
      {loading &&
        skeletons.map((skeleton) => (
          <ProjectCardSkeleton key={skeleton}></ProjectCardSkeleton>
        ))}
    </SimpleGrid>
  );
};

export default ProjectList;
