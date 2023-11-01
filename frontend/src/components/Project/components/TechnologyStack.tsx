import { Box, HStack, Text } from "@chakra-ui/react";

interface Props {
  stack: string[];
}

const TechnologyStack = ({ stack }: Props) => {
  return (
    <HStack gap={2} mb={2} flexWrap="wrap">
      {stack.length &&
        stack.map((el) => (
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
