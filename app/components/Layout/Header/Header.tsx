import { Container, Flex, Spacer, Text } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { RoomCreateButton } from "~/components/RoomCreateButton";

export const Header: React.FC = () => {
  const params = useParams();
  return (
    <Container>
      <Flex>
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
