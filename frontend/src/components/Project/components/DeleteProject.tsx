import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDeleteProjectMutation } from "../../../store/api/injections/projects";
import { Project } from "../../../types/Project";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}
const DeleteProject = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleDelete = () => {
    deleteProject(props.project._id);

    toast({
      title: `Project ${props.project.title} was deleted.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Project
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteProject;
