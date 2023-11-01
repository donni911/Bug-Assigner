import { Badge, HStack, Text } from "@chakra-ui/react";
import { AiFillBug, AiOutlineTeam } from "react-icons/ai";

type Props = {
  teamMembers: number;
  bugs: number;
};

const ShortInfo = ({ teamMembers, bugs }: Props) =>
  (teamMembers || bugs) && (
    <HStack gap={4} mb={4} flexWrap="wrap">
      <Badge fontSize={"1rem"} display={"flex"} alignItems={"center"} gap={"2"}>
        <Text size={"md"}>{bugs}</Text>
        <AiFillBug />
      </Badge>
      <Badge fontSize={"1rem"} display={"flex"} alignItems={"center"} gap={"2"}>
        <Text>{teamMembers}</Text>
        <AiOutlineTeam />
      </Badge>
    </HStack>
  );

export default ShortInfo;
