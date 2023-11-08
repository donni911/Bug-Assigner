import { Box, HStack, Text } from "@chakra-ui/react";
import { Technologie, technologiesValues } from "../../../data/technologies";

type Props = {
  technologies: Technologie[] | string | undefined;
};

const TechnologyStack = ({ technologies }: Props) => {
  const choosedTechnologies = technologiesValues.filter((el) =>
    technologies?.includes(el.value)
  );

  return (
    <HStack gap={2} flexWrap="wrap">
      {choosedTechnologies?.length &&
        choosedTechnologies?.map((el) => (
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
