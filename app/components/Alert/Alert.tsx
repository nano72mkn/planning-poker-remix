import type { AlertProps } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { alertDataState } from "../Provider/AlertProvider";

export type AlertType = {
  id: string;
  status: AlertProps["status"];
  title?: string;
  description?: string;
};

export const Alert: React.FC<AlertType> = ({
  id,
  status,
  title,
  description,
}) => {
  const setAlert = useSetRecoilState(alertDataState);
  useEffect(() => {
    setTimeout(() => {
      setAlert((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000);
  }, []);

  return (
    <ChakraAlert
      status={status}
      justifyContent="center"
      position="absolute"
      top={0}
      zIndex={1}
    >
      <AlertIcon />
      {title && <AlertTitle mr={2}>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </ChakraAlert>
  );
};
