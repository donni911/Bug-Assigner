import { SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import ProjectCardSkeleton from "./components/ProjectCardSkeleton";

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      slug: "airbnb",
      title: "Airbnb",
      description:
        "Find the perfect place to stay at an amazing price in 191 countries. Belong anywhere with Airbnb.",
      img: "https://miro.medium.com/v2/resize:fit:1358/0*NChTo-XqLOxLabIW",
      bugs: [
        {
          id: 1,
          description: "Bug 1",
          resolved: false,
        },
        {
          id: 2,
          description: "Bug 2",
          resolved: false,
        },
        {
          id: 3,
          description: "Bug 3",
          resolved: false,
        },
      ],
      stack: ["React", "MongoDB", "Express", "Node.js"],
      teamMembers: [
        {
          id: 1,
          name: "Rodion",
          surname: "Voinarovskyi",
          position: "Frontend",
        },
        {
          id: 2,
          name: "Oleh",
          surname: "Kostiuk",
          position: "Project Manager",
        },
      ],
    },
    {
      id: 2,
      slug: "car-trader",
      title: "Car Trader",
      description:
        "A company specializing in the purchase, registration and customs clearance of cars from the USA, Europe and China.",
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Audi_RS3_8Y_Sedan_IMG_6030.jpg",
      bugs: [
        {
          id: 4,
          description: "Bug 4",
          resolved: true,
        },
        {
          id: 5,
          description: "Bug 5",
          resolved: true,
        },
      ],
      stack: ["Vue", "MongoDB", "Express", "Node.js"],
      teamMembers: [
        {
          id: 5,
          name: "Oleh",
          surname: "Kotyai",
          position: "Frontend Developer",
        },
        {
          id: 4,
          name: "Serhiy",
          surname: "Kostiuk",
          position: "Backend Developer",
        },
      ],
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const skeletons = [1, 2, 3, 4];

  return (
    <SimpleGrid w="100%" columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
      {!isLoading &&
        projects.length &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      {isLoading &&
        skeletons.map((skeleton) => (
          <ProjectCardSkeleton key={skeleton}></ProjectCardSkeleton>
        ))}
    </SimpleGrid>
  );
};

export default ProjectList;
