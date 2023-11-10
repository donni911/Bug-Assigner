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
  useToast,
} from "@chakra-ui/react";
import BugsList from "./BugsList";
import AddBugDrawer from "./AddBugDrawer";
import { Form, FormWrap, useForm } from "@savks/react-forms";
import { useAddBugMutation } from "@/store/api/index.ts";
import { useGetProjectBugsByIdQuery } from "@/store/api/index.ts";
import { useEffect } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../components/Project/helpers/toast";

const BugsWrap = (props: { projectId: string }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addBug, { isError, isSuccess }] = useAddBugMutation();

  const { data: bugs, isFetching } = useGetProjectBugsByIdQuery(
    props.projectId
  );

  const form = useForm({
    title: "",
    description: "",
    priority: "",
    projectId: props.projectId,
  });

  useEffect(() => {
    if (isError) {
      showErrorMessage(toast, `Check validation field's`);
    } else if (isSuccess) {
      showSuccessMessage(toast, `Bug ${form?.data.title} was created.`);
      form.restore();
      onClose();
    }
  }, [isError, isSuccess]);

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
            <AddBugDrawer onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
          </FormWrap>
        </HStack>
        {bugs && !isFetching && <BugsList bugs={bugs} />}
        {isFetching && (
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            h={"100%"}
            w={"100%"}
          >
            <Spinner w={10} h={10} />
          </Stack>
        )}
        {!bugs?.length && !isFetching && (
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
