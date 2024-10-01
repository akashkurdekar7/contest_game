import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accentColor1};
  color: ${({ theme }) => theme.colors.primaryColor};
  padding: 0.75rem 1.5rem;
  border: none;
  width: 100%;
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.textSize.medium};
  font-family: ${({ theme }) => theme.fonts.primaryFont};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentColor2};
    color: ${({ theme }) => theme.colors.whiteColor};
  }
`;

const Button = ({ children, link, ...props }) => {
  return link ? (
    <Link to={link}>
      <StyledButton {...props}>{children}</StyledButton>
    </Link>
  ) : (
    <StyledButton {...props}>{children}</StyledButton>
  );
};

export default Button;
