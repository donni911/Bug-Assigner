import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { slug } = useParams();

  return <div>ProjectPage: {slug}</div>;
};

export default ProjectPage;
