import { Grid, SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      slug: "airbnb",
      title: "Airbnb",
      img: "https://miro.medium.com/v2/resize:fit:1358/0*NChTo-XqLOxLabIW",
      bugsCount: 3,
      stack: ["React", "MongoDB", "Express", "Node.js"],
    },
    {
      id: 2,
      slug: "car-trader",
      title: "Car Trader",
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Audi_RS3_8Y_Sedan_IMG_6030.jpg",
      bugsCount: 1,
      stack: ["Vue", "MongoDB", "Express", "Node.js"],
    },
  ];

  return (
    <SimpleGrid w="100%" columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
      {projects.length &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </SimpleGrid>
  );
};

export default ProjectList;
