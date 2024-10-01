import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
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

  .nav-list a {
    color: ${({ theme }) => theme.colors.whiteColor};
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.hoverColor};
      text-decoration: none;
    }
  }

  .account-menu {
    position: relative;
    cursor: pointer;
    font-size: ${({ theme }) => theme.textSize.medium};
    transition: all 0.3s ease;
  }

  .dropdown {
    display: ${({ isDropdownOpen }) => (isDropdownOpen ? "block" : "none")};
    position: absolute;
    top: 3.4rem;
    right: -3rem;
    background-color: ${({ theme }) => theme.colors.whiteColor};
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    border-radius: 4px;
    min-width: 150px;
    z-index: ${({ theme }) => theme.zIndex.dropdown};
  }

  .dropdown-item {
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    text-align: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textColor};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverColor};
      color: ${({ theme }) => theme.colors.whiteColor};
    }
  }

  .dropdown a {
    color: ${({ theme }) => theme.colors.textColor};
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.whiteColor};
      text-decoration: none;
    }
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  li {
    &:hover {
      color: ${({ theme }) => theme.colors.hoverColor};
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
    toast.success("You have successfully logged out!");
    setIsDropdownOpen(false);
    window.location.reload();
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
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
        <li className="nav-list">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-list">
          <Link to="/contests">Contests</Link>
        </li>
        <li className="nav-list">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-list">
          <Link to="/leaderboard">LeaderBoard</Link>
        </li>
        <li className="account-menu nav-list" onClick={handleToggle}>
          Account
        </li>
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
      </ul>
    </NavWrapper>
  );
};

export default Nav;
