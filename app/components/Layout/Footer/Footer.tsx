import { Container, Flex, Link, Spacer, Text } from "@chakra-ui/react";

export const Footer: React.FC = () => {
  return (
    <Container maxW="container.lg" mt={10}>
      <Flex>
        <Text>
          © 2022; Built by
          <Link href="https://twitter.com/shota1995m" isExternal ml={2}>
            @shota1995m
          </Link>
        </Text>
        <Spacer />
        <Link
          href="https://github.com/shota1995m/planning-poker-remix"
          isExternal
        >
          GitHub
        </Link>
      </Flex>
    </Container>
  );
};
