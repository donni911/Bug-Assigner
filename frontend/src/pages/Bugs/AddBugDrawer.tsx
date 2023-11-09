import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  Select,
  Textarea,
  DrawerFooter,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SimpleForm, StringFieldWrap } from "@savks/react-forms";

type Props = {
  isOpen: boolean;
  onClose: () => {};
};
const AddBugDrawer = (props: Props) => {
  return (
    <Drawer isOpen={props.isOpen} placement="right" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <SimpleForm className="c-form">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new issue
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <StringFieldWrap path="title">
                {({ value, error, change }) => (
                  <FormControl mb="4" isInvalid={!!error}>
                    <FormLabel htmlFor="title" fontWeight={"normal"}>
                      Issue Title {error}
                    </FormLabel>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={value}
                      onChange={change}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </StringFieldWrap>

              <StringFieldWrap path="priority">
                {({ value, error, change }) => (
                  <FormControl mb="4" isInvalid={!!error}>
                    <FormLabel htmlFor="priority" fontWeight={"normal"}>
                      Select priority for your Issue
                    </FormLabel>
                    <Select id="priority" value={value} onChange={change}>
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </Select>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </StringFieldWrap>

              <StringFieldWrap path="description">
                {({ value, error, change }) => (
                  <FormControl mb="4" isInvalid={!!error}>
                    <FormLabel htmlFor="description" fontWeight={"normal"}>
                      Issue Description
                    </FormLabel>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description"
                      value={value}
                      onChange={change}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </StringFieldWrap>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </DrawerFooter>
        </SimpleForm>
      </DrawerContent>
    </Drawer>
  );
};

export default AddBugDrawer;
