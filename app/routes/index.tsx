import { Button } from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import { nanoid } from "nanoid";

export default function Index() {
  const navigate = useNavigate();

  const createRoom = async () => {
    const roomId = nanoid(6);
    const userId = nanoid(6);

    sessionStorage.setItem("userId", userId);

    navigate(`/room/${roomId}`);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Button colorScheme="teal" onClick={createRoom}>
        ルーム作成
      </Button>
    </div>
  );
}
