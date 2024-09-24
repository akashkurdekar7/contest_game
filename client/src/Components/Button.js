import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-dark);
  }

  ${({ variant }) =>
    variant === "outline" &&
    `
      background-color: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);

      &:hover {
        background-color: var(--primary);
        color: var(--primary-foreground);
      }
  `}
`;

const Button = ({ children, link, variant, ...props }) => {
  return link ? (
    <Link to={link}>
      <StyledButton variant={variant} {...props}>
        {children}
      </StyledButton>
    </Link>
  ) : (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
