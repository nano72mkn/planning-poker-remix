import { Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { PokerData } from "~/routes/room/$roomId";
import { Card } from "../Card/Card";

interface CardListProps {
  pokerData: PokerData;
  isOpen: boolean;
}

export const CardList: React.FC<CardListProps> = ({ pokerData, isOpen }) => {
  const [sortedPokerData, setSortedData] = useState(Object.entries(pokerData));

  useEffect(() => {
    const data = Object.entries(pokerData);
    if (!isOpen) {
      setSortedData(data);
      return;
    }
    setSortedData(data.sort((a, b) => (b[1] < a[1] ? 1 : -1)));
  }, [pokerData, isOpen]);

  return (
    <Wrap spacing="10px">
      {pokerData &&
        sortedPokerData.map(([userId, point]) => (
          <WrapItem key={userId}>
            <Card isOpen={isOpen} isSelected={!isOpen && point !== ""}>
              {point}
            </Card>
          </WrapItem>
        ))}
    </Wrap>
  );
};
