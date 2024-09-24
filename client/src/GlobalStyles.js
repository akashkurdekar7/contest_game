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
    font-family: 'Oswald', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  /* Custom colors for your app (White and Red Theme) */
  :root {
    --primary: #ff0000; /* Bright Red */
    --primary-dark: #cc0000; /* Darker Red */
    --primary-light: #ffcccc; /* Light Red */
    --primary-foreground: #ffffff; /* White */
    --background-color: #ffffff; /* White */
    --text-color: #333333; /* Dark Gray for text */
  }

  /* Styling for buttons */
  button {
    background-color: var(--primary);
    color: var(--primary-foreground);
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--primary-foreground);
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: var(--primary-foreground);
      color: var(--primary);
    }
  }

  /* General link styling */
  a {
    color: var(--primary);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
      color: var(--primary-dark);
    }
  }

  /* Typography styles */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.2;
    color: var(--primary);
  }

  p {
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  ul, li, ol {
    list-style: none;
  }

  /* Card component global styles */
  .card {
    background-color: var(--primary-light);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary);
  }

  .card-description {
    font-size: 1rem;
    color: var(--text-color);
  }

  /* Footer styles */
  footer {
    background-color: var(--primary);
    color: var(--primary-foreground);
    padding: 1rem;
    text-align: center;
  }
`;

const GlobalStyle = () => {
  return <GlobalStyles />;
};

export default GlobalStyle;
