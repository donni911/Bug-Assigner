import { Box, HStack, Text } from "@chakra-ui/react";

type Technologies = string[];

const TechnologyStack = (props: Technologies) => {
  return (
    <HStack gap={2} mb={2} flexWrap="wrap">
      {props.technologies.length &&
        props.technologies.map((el) => (
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
