import { Container, Flex, Spacer, Text } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { RoomCreateButton } from "~/components/RoomCreateButton";

export const Header: React.FC = () => {
  const params = useParams();
  return (
    <Container maxW="container.lg" marginBottom={5}>
      <Flex paddingY={5}>
        <Text>Planning Poker Remix</Text>
        <Spacer />
        {params.roomId ? (
          <Text>roomId: {params.roomId}</Text>
        ) : (
          <RoomCreateButton />
        )}
      </Flex>
    </Container>
  );
};
