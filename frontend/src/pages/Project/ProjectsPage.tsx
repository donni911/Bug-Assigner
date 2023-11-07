import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  VStack,
} from "@chakra-ui/react";

import ProjectList from "../../components/Project/ProjectList";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  return (
    <VStack>
      <Container p={0} maxW="1440px">
        <VStack w="100%" gap={4}>
          <Box
            w="100%"
            borderRadius="sm"
            bg="white"
            border={"1px"}
            borderColor="black"
            color="white"
            p={4}
          >
            <HStack justifyContent="space-between" gap={4}>
              <Heading as="h2" size="xl" color="#000">
                Projects
              </Heading>
              <Button
                variant={"primary"}
                as={Link}
                to={"/projects/add-project"}
              >
                Add Project
              </Button>
            </HStack>
          </Box>
          <ProjectList />
        </VStack>
      </Container>
    </VStack>
  );
};

export default ProjectsPage;
