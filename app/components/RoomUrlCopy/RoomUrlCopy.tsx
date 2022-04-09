import { Button, Flex, Input, useClipboard } from "@chakra-ui/react";

interface RoomUrlCopyProps {
  roomId: string;
}

export const RoomUrlCopy: React.FC<RoomUrlCopyProps> = ({ roomId }) => {
  const { hasCopied, onCopy } = useClipboard(
    typeof location === "object" ? location.href : ""
  );

  return (
    <Flex width="100%">
      <Input
        type="text"
        isReadOnly
        value={typeof location === "object" ? location.href : ""}
      />
      <Button size="md" onClick={onCopy} ml={2}>
        {hasCopied ? "copied!" : "url copy"}
      </Button>
    </Flex>
  );
};
