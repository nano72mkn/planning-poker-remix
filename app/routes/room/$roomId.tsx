import { Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "@remix-run/react";
import {
  getDatabase,
  ref,
  push,
  runTransaction,
  onValue,
  onDisconnect,
  remove,
  child,
  get,
  set,
} from "firebase/database";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface Room {
  ownerId: string;
}

interface PokerData {
  [key: string]: string;
}

export default function Index() {
  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState<string>("anonymous");
  const [pokerData, setPokerData] = useState<PokerData>({});
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const database = getDatabase();

  const roomRef = ref(database, `rooms/${params.roomId}`);
  const pokerRef = child(roomRef, "poker");

  const init = async (currentUserId: string) => {
    const ownerId = await get(child(roomRef, "ownerId"));
    setUserId(currentUserId);

    runTransaction(pokerRef, (poker) => ({
      ...poker,
      [currentUserId]: "",
    }));

    if (!ownerId.val() || ownerId.val() === currentUserId) {
      set(child(roomRef, "ownerId"), currentUserId);
      onDisconnect(roomRef).remove();
    } else {
      setIsOwner(false);
      onDisconnect(child(pokerRef, currentUserId)).remove();
    }
  };

  useEffect(() => {
    if (pokerData !== null || isOwner) return;
    navigate("/");
  }, [pokerData]);

  useEffect(() => {
    onValue(pokerRef, (poker) => {
      setPokerData(poker.val());
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (userId !== "anonymous") return;

      const sessionUserId = sessionStorage.getItem("userId");
      if (sessionUserId) {
        init(sessionUserId);
        return;
      }

      const newUserId = nanoid(6);
      setUserId(newUserId);
      sessionStorage.setItem("userId", newUserId);

      init(newUserId);
    })();
  }, []);

  const setPoint = (point: number) => {
    runTransaction(pokerRef, (poker) => ({
      ...poker,
      [userId]: point,
    }));
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {params.roomId} userId: {userId}
      <Button colorScheme="teal" onClick={() => setPoint(1)}>
        1
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(2)}>
        2
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(3)}>
        3
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(5)}>
        5
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(8)}>
        8
      </Button>
      {pokerData &&
        Object.entries(pokerData).map(([userId, point]) => (
          <p key={userId}>
            {userId}:{point}
          </p>
        ))}
    </div>
  );
}
