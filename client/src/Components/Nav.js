import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavWrapper = styled.nav`
  position: relative;

  ul {
    display: flex;
    gap: 3rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .account-menu {
    position: relative;
    cursor: pointer;
    font-size: 16px;
  }

  .dropdown {
    display: ${({ isDropdownOpen }) =>
      isDropdownOpen ? "block" : "none"}; /* Fixed here */
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    min-width: 150px;
    z-index: 1000;
  }

  .dropdown-item {
    padding: 10px;
    border-bottom: 1px solid lightgray;
    text-align: center;
    cursor: pointer;
    color: black;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  li {
    color: white;
    &:hover {
      color: red;
    }
  }
`;

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.success("You have successfully logged out!"); // Corrected message
    setIsDropdownOpen(false); // Close dropdown
    window.location.reload();
    navigate("/"); // Redirect to home after logout
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false); // Close dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <NavWrapper isDropdownOpen={isDropdownOpen}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contests">Contests</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/leaderboard">LeaderBoard</Link>
        </li>
        <li className="account-menu" onClick={handleToggle}>
          Account
          <div className="dropdown" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <div className="dropdown-item">
                  <Link to="/contest/profile">Profile</Link>
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </>
            ) : (
              <div className="dropdown-item">
                <Link to="/contest/login">Login</Link>
              </div>
            )}
          </div>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Nav;
