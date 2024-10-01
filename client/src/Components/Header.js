import styled from "styled-components";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.whiteColor};
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
  font-size: ${({ theme }) => theme.textSize.xlarge};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.whiteColor};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.hoverColor};
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
