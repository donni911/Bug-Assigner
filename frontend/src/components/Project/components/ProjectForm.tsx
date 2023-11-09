import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Checkbox,
  Button,
} from "@chakra-ui/react";

import { technologiesValues } from "../../../data/technologies";

import {
  FieldWrap,
  SimpleForm,
  StringFieldWrap,
  CheckboxGroup,
} from "@savks/react-forms";

const ProjectForm = (props: { isLoading: boolean }) => {
  return (
    <SimpleForm>
      <StringFieldWrap path="title">
        {({ value, error, change }) => (
          <FormControl mb="4" isInvalid={!!error}>
            <FormLabel htmlFor="title" fontWeight={"normal"}>
              Name of your Projects
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

      <StringFieldWrap path="description">
        {({ value, error, change }) => (
          <FormControl mb="4" isInvalid={!!error}>
            <FormLabel htmlFor="description" fontWeight={"normal"}>
              Description of your Project
            </FormLabel>
            <Input
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

      <FieldWrap<string[]> path="technologies">
        {({ value, error, change }) => (
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="technologies" fontWeight={"normal"}>
              Choose your technologies
            </FormLabel>
            <HStack gap={4} flexWrap={"wrap"}>
              <CheckboxGroup
                items={technologiesValues}
                keyBy="value"
                value={value}
                onChange={change}
              >
                {(technologie, { checked, change }) => (
                  <FormLabel
                    cursor={"pointer"}
                    htmlFor={technologie.value}
                    display={"flex"}
                    gap={4}
                    key={technologie.value}
                  >
                    {technologie.name}
                    <Checkbox
                      colorScheme="gray"
                      id={technologie.value}
                      value={technologie.value}
                      onChange={change}
                      defaultChecked={checked}
                    />
                  </FormLabel>
                )}
              </CheckboxGroup>
            </HStack>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
        )}
      </FieldWrap>

      <Button
        mt={4}
        type="submit"
        variant={"primary"}
        w={"full"}
        isLoading={props.isLoading}
        loadingText="Submitting"
      >
        Submit
      </Button>
    </SimpleForm>
  );
};

export default ProjectForm;
