import { Container } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="container.lg">{children}</Container>
      <Footer />
    </>
  );
};
