import { Wrap, WrapItem } from "@chakra-ui/react";
import type { PokerData } from "~/routes/room/$roomId";
import { Card } from "../Card/Card";

interface CardListProps {
  pokerData: PokerData;
  isOpen: boolean;
}

export const CardList: React.FC<CardListProps> = ({ pokerData, isOpen }) => (
  <Wrap spacing="10px">
    {pokerData &&
      Object.entries(pokerData).map(([userId, point]) => (
        <WrapItem key={userId}>
          <Card isOpen={isOpen} isSelected={!isOpen && point !== ""}>
            {point}
          </Card>
        </WrapItem>
      ))}
  </Wrap>
);
