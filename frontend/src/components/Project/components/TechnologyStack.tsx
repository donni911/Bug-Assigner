import { Box, HStack, Text } from "@chakra-ui/react";

type Props = {
  technologies: string[];
};

const TechnologyStack = ({ technologies }: Props) => {
  return (
    <HStack gap={2} mb={2} flexWrap="wrap">
      {technologies.length &&
        technologies.map((el) => (
          <Box
            key={el}
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {el}
            </Text>
          </Box>
        ))}
    </HStack>
  );
};

export default TechnologyStack;
