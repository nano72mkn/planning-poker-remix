import { Button } from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import { getDatabase, ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { getAnalytics, logEvent } from "firebase/analytics";

export const RoomCreateButton: React.FC = () => {
  let navigate = useNavigate();

  const createRoom = async () => {
    const analytics = getAnalytics();
    logEvent(analytics, "create room");

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
    <Button colorScheme="teal" onClick={createRoom}>
      Create new room
    </Button>
  );
};
