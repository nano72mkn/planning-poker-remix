import { Button, HStack, Text, VStack } from "@chakra-ui/react";
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
import { CardList } from "~/components/CardList";
import { PointButtonList } from "~/components/PointButtonList";
import { RoomUrlCopy } from "~/components/RoomUrlCopy";
import { History } from "~/components/History";
import { getAverage } from "~/utils/getAverage";
import { getAnalytics, logEvent } from "firebase/analytics";

interface Room {
  isOpen: boolean;
  poker: PokerData;
  history: PokerData[];
}
export interface PokerData {
  [key: string]: number | string;
}

export default function Index() {
  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState<string>("anonymous");
  const [pokerData, setPokerData] = useState<Room["poker"]>({});
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<Room["isOpen"]>(false);
  const [history, setHistory] = useState<Room["history"]>([]);
  const database = getDatabase();

  const roomRef = ref(database, `rooms/${params.roomId}`);
  const pokerRef = child(roomRef, "poker");

  const init = async (currentUserId: string) => {
    const analytics = getAnalytics();
    const ownerId = await get(child(roomRef, "ownerId"));
    setUserId(currentUserId);

    runTransaction(pokerRef, (poker) => ({
      ...poker,
      [currentUserId]: "",
    }));

    if (ownerId.val() === currentUserId) {
      logEvent(analytics, `join owner`);
      runTransaction(roomRef, (room) => ({
        ...room,
        isOpen: false,
      }));
      onDisconnect(roomRef).remove();
    } else {
      logEvent(analytics, `join user`);
      setIsOwner(false);
      onDisconnect(child(pokerRef, currentUserId)).remove();
    }
  };

  useEffect(() => {
    onValue(roomRef, (room) => {
      const roomData = room.val() as Room;
      if (!roomData) {
        navigate("/");
        return;
      }
      setPokerData(roomData?.poker || {});
      setIsOpen(roomData?.isOpen || false);
      setHistory(roomData?.history || []);
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

  const reset = () => {
    const analytics = getAnalytics();
    logEvent(analytics, `reset: user count ${Object.keys(pokerData).length}`);

    runTransaction(roomRef, (room) => ({
      ...room,
      isOpen: false,
      poker: Object.fromEntries(
        Object.keys(room?.poker).map((userId) => [userId, ""])
      ),
      history: [room?.poker, ...(room?.history || [])],
    }));
  };

  return (
    <VStack spacing={5} align="flex-start">
      {params.roomId && (
        <>
          <RoomUrlCopy roomId={params.roomId} />
          <PointButtonList
            database={database}
            roomId={params.roomId}
            userId={userId}
            isOpen={isOpen}
          />
        </>
      )}
      {pokerData && <CardList pokerData={pokerData} isOpen={isOpen} />}

      <Text>Average: {isOpen ? getAverage(pokerData) : "?"}</Text>

      <HStack>
        {isOwner && (
          <Button colorScheme="teal" onClick={reset} disabled={!isOpen}>
            Reset
          </Button>
        )}
        <History history={history} />
      </HStack>
    </VStack>
  );
}
