import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Props {
  project: {
    id: number;
    slug: string;
    title: string;
    bugsCount: number;
    stack: string[];
    img: string;
  };
}

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
        // boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        // transition="box-shadow 0.2s ease-in"
        // _hover={{
        //   boxShadow: useColorModeValue("0px 0px 0 black", "0px 0px 0 cyan"),
        // }}
      >
        <Box
          h={"200px"}
          borderBottom={"1px"}
          display={"flex"}
          alignItems={"center"}
          borderColor="black"
          overflow={"hidden"}
        >
          <Img
            src={project.img}
            roundedTop={"sm"}
            objectFit="cover"
            alt={project.title}
            maxW={"100%"}
            h={"auto"}
            verticalAlign={"middle"}
          />
        </Box>
        <Box p={4}>
          <HStack gap={2} flexWrap="wrap">
            {project.stack.length &&
              project.stack.map((el) => (
                <Box
                  key={el}
                  bg="black"
                  display={"inline-block"}
                  px={2}
                  py={1}
                  color="white"
                  mb={2}
                >
                  <Text fontSize={"xs"} fontWeight="medium">
                    {el}
                  </Text>
                </Box>
              ))}
          </HStack>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {project.title}
          </Heading>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
            transition='box-shadow 0.125s ease'
            _hover={{
              boxShadow: "inset -2px -2px 0px 1px black",
            }}
          >
            <Text
              fontSize={"md"}
              fontWeight={"semibold"}
              as={Link}
              to={`/projects/${project.slug}`}
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
