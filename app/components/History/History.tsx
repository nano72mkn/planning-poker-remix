import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { getAnalytics, logEvent } from "firebase/analytics";
import type { PokerData } from "~/routes/room/$roomId";
import { getAverage } from "~/utils/getAverage";
import { CardList } from "../CardList";

interface HistoryProps {
  history: PokerData[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const historyOpen = () => {
    const analytics = getAnalytics();
    logEvent(analytics, `history open`);
    onOpen();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={historyOpen}>
        History
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>History</DrawerHeader>
          <DrawerBody>
            <VStack spacing={2} align="flex-start" alignItems="stretch">
              <Accordion allowMultiple>
                {history &&
                  history.map((pokerData, index) => (
                    <AccordionItem key={index}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            Average: {getAverage(pokerData)}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <CardList pokerData={pokerData} isOpen={true} />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
              </Accordion>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
