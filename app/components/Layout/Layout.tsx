import { Container } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
