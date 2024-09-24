import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // or however you store the user info

  if (!user) {
    return <Navigate to="/contest/login" replace />;
  }

  return children;
};
