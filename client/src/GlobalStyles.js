import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Global reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Set default font and background for the entire app */
  body {
    font-family: ${(props) => props.theme.fonts.primaryFont};
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.textColor};
    line-height: 1.6;
  }

  /* Styling for buttons */
  /* button {
    background-color: ${(props) => props.theme.colors.accentColor1};
    color: ${(props) => props.theme.colors.primaryColor};
    padding: 0.75rem 1.5rem;
    border: 2px solid ${(props) => props.theme.colors.primaryColor};
    border-radius: 0.5rem;
    font-size: ${(props) => props.theme.textSize.medium};
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryColor};
      color: ${(props) => props.theme.colors.accentColor1};
    }
  } */

  /* General link styling */
  a {
    color: ${(props) => props.theme.colors.accentColor1};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.colors.accentColor2};
    }
  }

  /* Typography styles */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    line-height: 1.2;
    color: ${(props) => props.theme.colors.accentColor1};
  }

  p {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.textColor};
  }

  ul, li, ol {
    list-style: none;
  }

  /* Card component global styles */
  .card {
    background-color: ${(props) => props.theme.colors.accentColor2};
    border-radius: 8px;
    box-shadow: ${(props) => props.theme.boxShadow.subtle};
    padding: 20px;
  }

  .card-title {
    font-size: ${(props) => props.theme.textSize.large};
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.accentColor1};
  }

  .card-description {
    font-size: ${(props) => props.theme.textSize.medium};
    color: ${(props) => props.theme.colors.textColor};
  }

  /* Footer styles */
  footer {
    background-color: ${(props) => props.theme.colors.primaryColor};
    color: ${(props) => props.theme.colors.backgroundColor};
    padding: 1rem;
    text-align: center;
  }
`;

const GlobalStyle = () => {
  return <GlobalStyles />;
};

export default GlobalStyle;
