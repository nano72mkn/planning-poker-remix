import { Button, Flex } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { useNavigate, useParams } from "@remix-run/react";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue,
  onDisconnect,
  child,
  get,
} from "firebase/database";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface Room {
  isOpen: boolean;
  poker: PokerData;
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

    if (ownerId.val() === currentUserId) {
      runTransaction(roomRef, (room) => ({
        ...room,
        isOpen: false,
      }));
      onDisconnect(roomRef).remove();
    } else {
      setIsOwner(false);
      onDisconnect(child(pokerRef, currentUserId)).remove();
    }
  };

  useEffect(() => {
    (async () => {
      if (pokerData !== null || isOwner) return;
      navigate("/");
    })();
  }, [pokerData]);

  useEffect(() => {
    onValue(roomRef, (room) => {
      const roomData = room.val() as Room;
      setPokerData(roomData?.poker || {});
      setIsOpen(roomData?.isOpen || false);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const ownerId = await get(child(roomRef, "ownerId"));
      if (!ownerId.val()) {
        navigate("/");
        return;
      }

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
      ...(poker || {}),
      [userId]: point,
    }));

    runTransaction(roomRef, (room) => ({
      ...room,
      isOpen:
        Object.values(room?.poker || {}).find((point) => point === "") ===
        undefined,
    }));
  };

  const reset = () => {
    runTransaction(roomRef, (room) => ({
      ...room,
      isOpen: false,
      poker: Object.fromEntries(
        Object.keys(room?.poker).map((userId) => [userId, ""])
      ),
    }));
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {params.roomId} userId: {userId}
      <Button colorScheme="teal" onClick={() => setPoint(1)} disabled={isOpen}>
        1
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(2)} disabled={isOpen}>
        2
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(3)} disabled={isOpen}>
        3
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(5)} disabled={isOpen}>
        5
      </Button>
      <Button colorScheme="teal" onClick={() => setPoint(8)} disabled={isOpen}>
        8
      </Button>
      <Flex>
        {pokerData &&
          Object.entries(pokerData).map(([userId, point]) => (
            <p key={userId}>{isOpen ? `${userId}:${point}` : "..."}</p>
          ))}
      </Flex>
      {isOwner && (
        <Button colorScheme="teal" onClick={reset} disabled={!isOpen}>
          reset
        </Button>
      )}
    </div>
  );
}
