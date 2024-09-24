import styled from "styled-components";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  background-color: black;
  color: white;
  padding: 1rem 0;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  &:hover {
    color: red;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">ContestHub</Logo>
        <Nav />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
