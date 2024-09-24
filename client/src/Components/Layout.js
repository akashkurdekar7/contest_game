import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Main = styled.main`
  flex-grow: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
