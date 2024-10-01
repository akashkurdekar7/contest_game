import GlobalStyle from "./GlobalStyles";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import ContestsPage from "./Pages/ContestPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GamePage from "./Pages/GamePage";
import Profile from "./Pages/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import About from "./Pages/About";
import Leaderboard from "./Components/LeaderBoard";
import { ThemeProvider } from "styled-components";

// Extended theme configuration
const theme = {
  colors: {
    primaryColor: "#2B2D42", // Dark slate for primary elements
    secondaryColor: "#8D99AE", // Muted blue-gray for secondary elements
    backgroundColor: "#EDF2F4", // Light gray for background
    accentColor1: "#EF233C", // Vibrant red for buttons, call-to-actions
    accentColor2: "#D90429", // Deep red for highlights or hover states
    textColor: "#2B2D42", // Dark slate for text
    hoverColor: "#EF233C", // Hover color for interactive elements
    borderColor: "#8D99AE", // For borders and dividers
    whiteColor: "#ffffff", // white color 
    blackColor: "#000000", // black color 
  },
  fonts: {
    primaryFont: "'Roboto', sans-serif", // For body text
    secondaryFont: "'Open Sans', sans-serif", // For headings or buttons
  },
  textSize: {
    small: "0.875rem", // Small text size, 14px
    medium: "1rem", // Regular text size, 16px
    large: "1.5rem", // Large text size, 24px
    xlarge: "2rem", // Extra-large text size, 32px
  },
  boxShadow: {
    subtle: "0px 1px 3px rgba(0, 0, 0, 0.12)", // Subtle shadow for cards or buttons
    medium: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Medium shadow for more pronounced depth
    heavy: "0px 10px 15px rgba(0, 0, 0, 0.2)", // Heavy shadow for modal dialogs
  },
  zIndex: {
    dropdown: 1000, // For dropdowns
    modal: 1050, // For modal dialogs
    toast: 1100, // For toast notifications
    tooltip: 1200, // For tooltips
  },
  fontWeight: {
    light: 300, // Light font weight for less emphasis
    normal: 400, // Normal font weight
    bold: 700, // Bold font weight for emphasis
    bolder: 900, // Extra-bold font weight
  },
};

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contest/register" element={<Register />} />
          <Route path="/contest/login" element={<Login />} />

          <Route
            path="/contests"
            element={
              <ProtectedRoute>
                <ContestsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game/:gameId"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />

          <Route path="/contest/profile" element={<Profile />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </>
  );
};

export default App;
