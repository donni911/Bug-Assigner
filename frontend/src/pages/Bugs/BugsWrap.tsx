import {
  Box,
  Button,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import BugsList from "./BugsList";
import { Bug } from "../../types/Bug";
import AddBugDrawer from "./AddBugDrawer";
import { Form, FormWrap, useForm } from "@savks/react-forms";
import { useAddBugMutation } from "../../store/api/injections/bugs";
import { useGetProjectBugsByIdQuery } from "../../store/api/injections/projects";

const BugsWrap = (props: { projectId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addBug] = useAddBugMutation();

  const { data: bugs, isFetching } = useGetProjectBugsByIdQuery(
    props.projectId
  );

  const form = useForm({
    title: "",
    description: "",
    priority: "",
    projectId: props.projectId,
  });

  const submitForm = (form: Form) => {
    addBug(form);
  };

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
      <VStack alignItems={"start"} p={4} h={"100%"}>
        <HStack
          borderBottom={"1px solid black"}
          pb={4}
          mb={4}
          w={"100%"}
          gap={4}
          justifyContent={"space-between"}
        >
          <Heading as="h3" size="lg">
            Issues
          </Heading>
          <Button variant={"primary"} onClick={onOpen}>
            Add Issue
          </Button>
          <FormWrap form={form} onSubmit={submitForm}>
            <AddBugDrawer onClose={onClose} isOpen={isOpen} />
          </FormWrap>
        </HStack>
        {bugs && <BugsList bugs={bugs} />}
        {isFetching && (
          <Stack justifyContent={"center"} alignItems={"center"} h={'100%'} w={'100%'}>
            <Spinner w={10} h={10} />
          </Stack>
        )}
        {!bugs && !isFetching && (
          <Stack
            w={"100%"}
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text>Success! You have no bugs in this project.</Text>
          </Stack>
        )}
      </VStack>
    </Box>
  );
};

export default BugsWrap;
