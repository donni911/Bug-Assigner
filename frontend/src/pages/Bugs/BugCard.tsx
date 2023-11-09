import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Bug } from "../../types/Bug";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import { AiOutlineCheckSquare } from "react-icons/ai";

const BugsCard = (props: { bug: Bug }) => {
  let badgeColor;

  if (props.bug.priority == "low") {
    badgeColor = {
      color: "green",
      title: "Low",
    };
  } else if (props.bug.priority == "medium") {
    badgeColor = {
      color: "orange",
      title: "Medium",
    };
  } else if (props.bug.priority == "high") {
    badgeColor = {
      color: "red",
      title: "Low",
    };
  }

  return (
    <Box w={"100%"} border={"1px solid black"} p={2}>
      <VStack w={"100%"} justifyContent={"start"}>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Badge
            colorScheme={badgeColor?.color}
          >{`${badgeColor?.title} priority`}</Badge>
          <Menu>
            <MenuButton
              flexShrink={0}
              as={Button}
              rightIcon={<ChevronDownIcon w={6} h={6} />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem icon={<EditIcon />}>Edit</MenuItem>
              <MenuItem icon={<AiOutlineCheckSquare />}>Resolve</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <VStack w={"100%"} alignItems={"start"}>
          <Heading as="h4" size="md">
            {props.bug?.title}
          </Heading>
          <Text>{props?.bug.description}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default BugsCard;
