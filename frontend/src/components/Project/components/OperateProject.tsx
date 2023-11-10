import { useParams } from "react-router-dom";
import AddProjectForm from "../AddProjectForm";
import UpdateProjectForm from "../UpdateProjectForm"; // Import UpdateProjectForm
import { useGetProjectQuery } from "@/store/api/index.ts";

type Props = {
  updateMode?: boolean;
};

const OperateProject = ({ updateMode }: Props) => {
  if (updateMode) {
    const { slug } = useParams();
    const { data: project } = useGetProjectQuery(slug);
    return project && <UpdateProjectForm project={project} />;
  } else {
    return <AddProjectForm />;
  }
};

export default OperateProject;
