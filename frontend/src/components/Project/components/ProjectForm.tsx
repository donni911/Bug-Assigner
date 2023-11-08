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
          <FormControl mb="4">
            <FormLabel htmlFor="title" fontWeight={"normal"}>
              Name of your Project
            </FormLabel>
            <Input
              id="title"
              name="title"
              placeholder="Title"
              value={value}
              onChange={change}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
          </FormControl>
        )}
      </StringFieldWrap>

      <StringFieldWrap path="description">
        {({ value, error, change }) => (
          <FormControl mb="4">
            <FormLabel htmlFor="description" fontWeight={"normal"}>
              Name of your Project
            </FormLabel>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              value={value}
              onChange={change}
            />
            <div>Error:{error}</div>
            {/* {error ? <FormErrorMessage>{error}</FormErrorMessage> : null} */}
          </FormControl>
        )}
      </StringFieldWrap>

      <FieldWrap<string[]> path="technologies">
        {({ value, error, change }) => (
          <FormControl>
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
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
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
