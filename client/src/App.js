import GlobalStyle from "./GlobalStyles";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import ContestsPage from "./Pages/ContestPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the default styles
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GamePage from "./Pages/GamePage";
import Profile from "./Pages/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import About from "./Pages/About";
import Leaderboard from "./Components/LeaderBoard";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
