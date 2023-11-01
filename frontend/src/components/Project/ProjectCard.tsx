import { Box, Heading, Text, Flex, Center, HStack } from "@chakra-ui/react";

import { BsArrowUpRight } from "react-icons/bs";

import { Link } from "react-router-dom";
import ShortInfo from "./components/ShortInfo";
import TechnologyStack from "./components/TechnologyStack";

type Props = {
  project: {
    id: number;
    slug: string;
    title: string;
    bugs: object[];
    teamMembers: object[];
    stack: string[];
    description: string;
  };
};

const ProjectCard = ({ project }: Props) => {
  return (
    <Center w="100%">
      <Box
        w="100%"
        rounded={"sm"}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
      >
        <Box p={4}>
          <TechnologyStack stack={project.stack} />

          <Heading mb={4} color={"black"} fontSize={"2xl"} noOfLines={1}>
            {project.title}
          </Heading>

          <ShortInfo
            bugs={project.bugs.length}
            teamMembers={project.teamMembers.length}
          />

          <Text mt={2} noOfLines={2}>
            {project.description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
            position={"relative"}
            transition="box-shadow 0.125s ease"
            _hover={{
              boxShadow: "inset -2px -2px 0px 1px black",
            }}
          >
            <Text
              fontSize={"md"}
              fontWeight={"semibold"}
              as={Link}
              to={`/projects/${project.slug}`}
              variant="full-block"
            >
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          {/* <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex> */}
        </HStack>
      </Box>
    </Center>
  );
};

export default ProjectCard;
