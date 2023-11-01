import { ReactNode } from "react";

import { Box } from "@chakra-ui/react";
interface Props {
  children?: ReactNode;
}
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box py={5} px={4}>
      {children}
    </Box>
  );
};

export default GameCardContainer;
