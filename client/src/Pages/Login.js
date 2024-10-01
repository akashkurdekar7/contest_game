import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from "../Components/Layout";
import Button from "../Components/Button";
import styled from "styled-components";
import axios from "axios";
import { useGameCompletion } from "./../Contexts/GameHandlerContext";

const Login = () => {
  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { resetGames } = useGameCompletion();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token, user } = response.data;
      const userSlug = user.slug;

      // Save JWT token and user details to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("slug", userSlug);

      resetGames();
      toast.success("Login successful!");
      navigate("/contests");
    } catch (error) {
      console.error("Login failed", error);
      toast.error(
        error.response?.data?.message ||
          "Frontend: An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    // Check for existing token
    if (localStorage.getItem("authToken")) {
      navigate("/contests");
    }

    // Token expiration check
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          toast.error("Your session has expired. Please log in again.");
          navigate("/login");
        }
      }
    };

    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    // Handle tab/browser close
    const handleTabClose = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("slug");
    };

    window.addEventListener("beforeunload", handleTabClose);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [navigate]);

  return (
    <Layout>
      <Wrapper>
        <div className="form-container">
          <h1 className="form-title">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="form-input"
              />
            </div>
            <div className="form-group relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <i
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>
            </div>
            <Button type="submit" className="submit-button">
              Login
            </Button>
          </form>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    padding: 20px;
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.boxShadow.heavy};
  }

  .form-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondaryColor};
  }

  .form-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }
  .form-input:focus {
    border-color: ${({ theme }) => theme.colors.borderColor};
    outline: none;
  }

  .eye-button {
    position: absolute;
    right: 0.5rem;
    top: 57%;
    transform: translateX(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }

  .relative {
    position: relative;
  }
`;

export default Login;
