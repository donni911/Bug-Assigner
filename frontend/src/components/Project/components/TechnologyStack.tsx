import { Box, HStack, Text } from "@chakra-ui/react";
import { Technologie } from "../../../data/technologies";

type Props = {
  technologies: Technologie[] | undefined;
};

const TechnologyStack = ({ technologies }: Props) => {
  return (
    <HStack gap={2} flexWrap="wrap">
      {technologies?.length &&
        technologies?.map((el) => (
          <Box
            key={el.value}
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {el.name}
            </Text>
          </Box>
        ))}
    </HStack>
  );
};

export default TechnologyStack;
