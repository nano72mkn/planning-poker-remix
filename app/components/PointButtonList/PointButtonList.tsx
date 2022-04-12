import { Button, Wrap, Select, VStack } from "@chakra-ui/react";
import { child, ref, runTransaction } from "firebase/database";
import { useState } from "react";
import type { Database } from "firebase/database";

interface PointButtonListProps {
  database: Database;
  roomId: string;
  userId: string;
  isOpen: boolean;
}

interface CardData {
  label: string;
  value: number | null;
}

type CardPack = CardData[];

type CardPackName = "Mountain Goat" | "Fibonacci" | "Sequential";

type CardPacks = {
  [key in CardPackName]: CardPack;
};

const cardPacks: CardPacks = {
  "Mountain Goat": [
    { label: "0", value: 0 },
    { label: "1/2", value: 0.5 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "5", value: 5 },
    { label: "8", value: 8 },
    { label: "13", value: 13 },
    { label: "20", value: 20 },
    { label: "40", value: 40 },
    { label: "100", value: 100 },
    { label: "?", value: null },
    { label: "☕️", value: null },
  ],
  Fibonacci: [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "5", value: 5 },
    { label: "8", value: 8 },
    { label: "13", value: 13 },
    { label: "21", value: 21 },
    { label: "34", value: 34 },
    { label: "55", value: 55 },
    { label: "89", value: 89 },
    { label: "?", value: null },
  ],
  Sequential: [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "?", value: null },
  ],
};

export const PointButtonList: React.FC<PointButtonListProps> = ({
  database,
  roomId,
  userId,
  isOpen,
}) => {
  const [cardPack, setCardPack] = useState<CardPackName>("Mountain Goat");
  const roomRef = ref(database, `rooms/${roomId}`);
  const pokerRef = child(roomRef, "poker");

  const setPoint = (point: number | null) => {
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
  return (
    <VStack spacing="10px">
      <Select
        value={cardPack}
        onChange={(event) => setCardPack(event.target.value as CardPackName)}
      >
        {Object.keys(cardPacks).map((cardPackName) => (
          <option key={cardPackName} value={cardPackName}>
            {cardPackName}
          </option>
        ))}
      </Select>
      <Wrap spacing="10px" w="100%">
        {cardPacks[cardPack].map((pack, index) => (
          <Button
            key={index}
            colorScheme="teal"
            onClick={() => setPoint(pack.value)}
            disabled={isOpen}
          >
            {pack.label}
          </Button>
        ))}
      </Wrap>
    </VStack>
  );
};
