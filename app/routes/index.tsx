import { Button } from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import { getDatabase, ref, set } from "firebase/database";
import { nanoid } from "nanoid";

export default function Index() {
  let navigate = useNavigate();

  const createRoom = async () => {
    const database = getDatabase();
    const roomId = nanoid(6);
    const userId = nanoid(6);

    await set(ref(database, `rooms/${roomId}`), {
      ownerId: userId,
    });
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
