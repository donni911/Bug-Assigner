import { Box, Container, HStack, Heading, VStack } from "@chakra-ui/react";

import AddProjectButton from "../components/Project/AddProjectButton";
import ProjectList from "../components/Project/ProjectList";

const Home = () => {
  return (
    <VStack>
      <Container maxW="1440px">
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
              <AddProjectButton />
            </HStack>
          </Box>
          <ProjectList />
        </VStack>
      </Container>
    </VStack>
  );
};

export default Home;
