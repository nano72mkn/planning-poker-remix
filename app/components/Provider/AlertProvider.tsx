import { HStack } from "@chakra-ui/react";
import { atom, useRecoilValue } from "recoil";
import type { AlertType } from "../Alert";
import { Alert } from "../Alert";

export const alertDataState = atom<AlertType[]>({
  key: "alertData",
  default: [],
});

export const AlertProvider: React.FC = ({ children }) => {
  const alertData = useRecoilValue(alertDataState);
  console.log(alertData);
  return (
    <div>
      <HStack spacing={2}>
        {alertData.map((alert, index) => (
          <Alert
            key={index}
            id={alert.id}
            status={alert.status}
            title={alert.title}
            description={alert.description}
          />
        ))}
      </HStack>
      {children}
    </div>
  );
};
