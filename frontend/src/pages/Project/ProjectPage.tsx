import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "@/store/api/index.ts";
import { SimpleGrid } from "@chakra-ui/react";
import ProjectInfo from "../../components/Project/components/ProjectInfo";
import ProjectInfoSkeleton from "./Skeletons/ProjectInfoSkeleton";
import BugsWrap from "../Bugs/BugsWrap";

const ProjectPage = () => {
  const { slug } = useParams();

  const { data: project, isFetching: projectFetching } =
    useGetProjectQuery(slug);

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      {!projectFetching ? (
        <ProjectInfo project={project} />
      ) : (
        <ProjectInfoSkeleton />
      )}
      {project && <BugsWrap projectId={project._id} />}
    </SimpleGrid>
  );
};

export default ProjectPage;
