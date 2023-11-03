import {
  Image,
  GridItem,
  SimpleGrid,
  HStack,
  Link as ChakraLink,
  Box,
  Text,
  IconButton,
  useDisclosure,
  Stack,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import logo from "@/assets/logo.webp";
import { NavLink as ReactRouterLink } from "react-router-dom";

function NavBar() {
  const links = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/projects",
      title: "Projects",
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderBottom={"1px solid #000"}>
      <Container p={0} maxW="1440px">
        <SimpleGrid
          columns={{ base: 2, md: 3 }}
          w={"100%"}
          gap={2}
          alignItems="center"
          paddingX={4}
          paddingY={2}
        >
          <GridItem>
            <ChakraLink
              as={ReactRouterLink}
              to="/"
              display={"inline-flex"}
              alignItems={"center"}
              _hover={{
                textDecoration: "none",
              }}
              role="group"
              gap={2}
            >
              <Box
                h={10}
                w={10}
                transition={"transform 0.2s ease"}
                _groupHover={{ transform: "translateX(5px)" }}
              >
                <Image p={0} w="100%" h="100%" src={logo} flexShrink={0} />
              </Box>
              <Text
                fontWeight={"bold"}
                transition={"color 0.2s ease"}
                _groupHover={{ color: "green.500" }}
              >
                Bug Assigner
              </Text>
            </ChakraLink>
          </GridItem>

          <GridItem display={{ base: "none", md: "block" }}>
            <HStack justifyContent={"center"} gap={4}>
              {links &&
                links.map((link) => (
                  <ChakraLink
                    _activeLink={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                    key={link.url}
                    as={ReactRouterLink}
                    to={link.url}
                  >
                    {link.title}
                  </ChakraLink>
                ))}
            </HStack>
          </GridItem>

          <GridItem
            display={{ base: "inline-flex", md: "none" }}
            justifyContent={"end"}
          >
            <IconButton
              w="10"
              h="10"
              variant={"default"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon w={6} h={6} />}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </GridItem>

          {isOpen ? (
            <GridItem colEnd={-1} colStart={1}>
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4}>
                  {links &&
                    links.map((link) => (
                      <ReactRouterLink key={link.url} to={link.url}>
                        {link.title}
                      </ReactRouterLink>
                    ))}
                </Stack>
              </Box>
            </GridItem>
          ) : null}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default NavBar;
