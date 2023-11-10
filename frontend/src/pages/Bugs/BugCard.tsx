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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Bug } from "../../types/Bug";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "@/store/api/index.ts";
import { Form, FormWrap, useForm } from "@savks/react-forms";
import AddBugDrawer from "./AddBugDrawer";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/components/Project/helpers/toast";
import { useEffect } from "react";

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
      title: "High",
    };
  }

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteBug, { isLoading }] = useDeleteBugMutation();
  const [updateBug, { isError, isSuccess }] = useUpdateBugMutation();

  const form = useForm({
    ...props.bug,
  });

  const handleDeleteBug = () => {
    deleteBug(props.bug._id);
  };

  const handleResolveBug = () => {
    form.fill({ resolved: !props.bug.resolved });
    updateBug(form);
  };

  useEffect(() => {
    if (isError) {
      showErrorMessage(toast, `Check validation field's`);
    } else if (isSuccess) {
      showSuccessMessage(toast, `Bug ${form?.data.title} was updated.`);
      onClose();
    }
  }, [isError, isSuccess]);

  const submitForm = (form: Form) => {
    updateBug(form);
  };

  return (
    <Box
      w={"100%"}
      border={"1px solid black"}
      p={2}
      pos={"relative"}
      _after={
        props.bug.resolved
          ? { pos: "absolute", content: "''", inset: "0px", bg: "#ffffff82" }
          : ""
      }
    >
      <VStack w={"100%"} justifyContent={"start"}>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Badge
            colorScheme={badgeColor?.color}
            textDecoration={props.bug.resolved ? "line-through" : ""}
          >
            {`${badgeColor?.title} priority`}
          </Badge>
          <Menu closeOnSelect={false}>
            <MenuButton
              zIndex={1}
              flexShrink={0}
              as={Button}
              rightIcon={<ChevronDownIcon w={6} h={6} />}
            >
              Actions
            </MenuButton>
            <MenuList zIndex={2}>
              <MenuItem closeOnSelect icon={<EditIcon />} onClick={onOpen}>
                Edit
                <FormWrap form={form} onSubmit={submitForm}>
                  <AddBugDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                  ></AddBugDrawer>
                </FormWrap>
              </MenuItem>
              <MenuItem
                icon={
                  props.bug.resolved ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )
                }
                as={Button}
                isLoading={isLoading}
                onClick={handleResolveBug}
                borderRadius={0}
              >
                Mark as{props.bug.resolved ? " unresolved" : " resolved"}
              </MenuItem>
              <MenuItem
                as={Button}
                isLoading={isLoading}
                onClick={handleDeleteBug}
                color={"red.500"}
                icon={<DeleteIcon />}
                borderRadius={0}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <VStack w={"100%"} alignItems={"start"}>
          <Heading
            as="h4"
            size="md"
            textDecoration={props.bug.resolved ? "line-through" : ""}
          >
            {props.bug?.title}
          </Heading>
          <Text textDecoration={props.bug.resolved ? "line-through" : ""}>
            {props?.bug.description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default BugsCard;
