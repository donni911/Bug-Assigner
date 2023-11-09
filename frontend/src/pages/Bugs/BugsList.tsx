import { VStack } from "@chakra-ui/react";
import { Bug } from "../../types/Bug";
import BugCard from "./BugCard";

const BugsList = (props: { bugs: Bug[] }) => {
  return (
    <VStack gap={4} w={"100%"}>
      {props?.bugs &&
        props?.bugs.map((bug) => <BugCard key={bug._id} bug={bug} />)}
    </VStack>
  );
};

export default BugsList;
