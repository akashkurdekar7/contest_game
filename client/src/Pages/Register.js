import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from "../Components/Layout";
import Button from "../Components/Button";
import styled from "styled-components";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    number: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // Validate phone number length
    if (formData.number.length !== 10) {
      toast.error("Phone number must be 10 digits long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        number: "",
      });
      console.log("response: ", response);
      toast.success("Registration successful!");
      navigate("/contest/login");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error(
        error.response?.data?.message ||
          "Frontend : An error occurred. Please try again."
      );
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="form-container">
          <h1 className="form-title">Register for Contests</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="form-input"
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="30"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="number" className="form-label">
                Phone Number
              </label>
              <input
                id="number"
                name="number"
                type="tel"
                value={formData.number}
                onChange={handleChange}
                placeholder="1234567890"
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
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-group relative">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-button"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Button type="submit" className="submit-button">
              Register
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
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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
    color: gray;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid lightgray;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  .form-input:focus {
    border-color: black;
    outline: none;
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }

  .eye-button {
    position: absolute;
    right: 10px;
    top: 38px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .submit-button {
    background-color: black;
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: gray;
    }
  }

  .relative {
    position: relative;
  }
`;

export default Register;
