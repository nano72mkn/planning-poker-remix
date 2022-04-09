import { Flex } from "@chakra-ui/react";

interface CardProps {
  isOpen: boolean;
  isSelected: boolean;
}

export const Card: React.FC<CardProps> = ({ children, isOpen, isSelected }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width={50}
      height={70}
      borderWidth="1px"
      borderRadius="md"
      borderColor={isSelected ? "teal.300" : "gray.200"}
      p="4"
      boxShadow="md"
      fontWeight={isOpen ? "bold" : "normal"}
      fontSize={isOpen ? "xl" : "md"}
    >
      {isOpen ? children : "?"}
    </Flex>
  );
};
