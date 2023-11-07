import TechnologyStack from "./TechnologyStack";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteProject from "./DeleteProject";

import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  MenuButton,
  Button,
  Menu,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

import { Project } from "../../../types/Project";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};

const ProjectInfo = ({ project }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="100%"
      h="100%"
      rounded={"sm"}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
      borderColor="black"
    >
      <VStack alignItems={"start"} p={4}>
        <HStack mb={4} w={"100%"} gap={6} justifyContent={"space-between"}>
          <Heading as="h2" size="2xl" fontSize="5xl">
            {project?.title}
          </Heading>
          <Menu>
            <MenuButton flexShrink={0} as={Button} rightIcon={<ChevronDownIcon w={6} h={6} />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                to={`/projects/update-project/${project.slug}`}
                icon={<EditIcon />}
              >
                Update
              </MenuItem>
              <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
                Delete
                <DeleteProject
                  onClose={onClose}
                  isOpen={isOpen}
                  project={project}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Box
          w={"100%"}
          display={"flex"}
          gap={"4"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
        >
          <Heading as="h3" size="sm" flexShrink={0}>
            Technologies used in this project:
          </Heading>
          <Box flexGrow={0}>
            <TechnologyStack technologies={project?.technologies} />
          </Box>
        </Box>
        <Box>
          <Heading as="h3" size="sm" flexShrink={0} mb={"2"}>
            About this project
          </Heading>
          <Text>{project?.description}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProjectInfo;
