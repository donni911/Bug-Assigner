import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleGrid, Text } from "@chakra-ui/react";

import { Project } from "../../types/Project.ts";
import store, { RootState } from "../../store/store.ts";

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

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      loadProjects(dispatch, store.getState);
      effectRan.current = true;
    }
  }, [dispatch]);

  const skeletons = [1, 2, 3, 4];
  if (!loading && !projects.length) {
    return <Text>No Projects yet, want to add some?</Text>;
  } else {
    return (
      <SimpleGrid w="100%" columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
        {!loading &&
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
        {loading &&
          skeletons.map((skeleton) => (
            <ProjectCardSkeleton key={skeleton}></ProjectCardSkeleton>
          ))}
      </SimpleGrid>
    );
  }
};

export default ProjectList;
