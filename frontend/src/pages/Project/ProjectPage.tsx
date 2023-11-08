import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../store/api/injections/projects";
import { SimpleGrid } from "@chakra-ui/react";
import ProjectInfo from "../../components/Project/components/ProjectInfo";
import ProjectInfoSkeleton from "./Skeletons/ProjectInfoSkeleton";

const ProjectPage = () => {
  const { slug } = useParams();

  const { data: project, isFetching } = useGetProjectQuery(slug);

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
      {!isFetching ? (
        <ProjectInfo project={project} />
      ) : (
        <ProjectInfoSkeleton />
      )}
    </SimpleGrid>
  );
};

export default ProjectPage;
