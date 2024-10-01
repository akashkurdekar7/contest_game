import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Button from "../Components/Button";
import styled from "styled-components";
import axios from "axios";
import { FaCrown } from "react-icons/fa";

const Home = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all-users");
      console.log("response from users: ", res.data);

      const sortedUsers = res.data.users
        .map((user) => {
          const startTime = new Date(user.startTime);
          const endTime = new Date(user.endTime);
          const timeTaken = (endTime - startTime) / 1000; // Time in seconds

          return {
            ...user,
            totalScore: user.totalScore || 0,
            timeTaken, // Add timeTaken to each user object
          };
        })
        .sort((a, b) => {
          // First sort by score (descending), then by time taken (ascending)
          if (b.totalScore === a.totalScore) {
            return a.timeTaken - b.timeTaken; // Lower time taken ranks higher
          }
          return b.totalScore - a.totalScore; // Higher score ranks higher
        });

      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <Container>
        <div className="text-center">
          <Heading>Welcome to ContestHub</Heading>
          <Description>
            Join our exciting contests and win amazing prizes!
          </Description>
          <ImageWrapper>
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Contest Banner"
              className="mx-auto rounded-lg shadow-lg"
            />
          </ImageWrapper>
          <div className="space-y-4">
            {isAuthenticated ? (
              <p className="text-lg font-semibold">
                You're already registered! Go play now.
              </p>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  Registration is now open!
                </p>
                <Button link="/contest/register">Register Now</Button>
              </>
            )}
          </div>
        </div>

        <LeaderboardWrapper>
          <h2>Leaderboard</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : users.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>BU</th>
                  <th>Email</th>
                  <th>MileStone</th>
                  <th>Time Taken (sec)</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>
                      {index + 1 <= 3 ? (
                        <span>
                          {index + 1 === 1 && <FaCrown className="first" />}
                          {index + 1 === 2 && <FaCrown className="second" />}
                          {index + 1 === 3 && <FaCrown className="third" />}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.totalScore}</td>
                    <td>{user.totalTime.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users registered yet.</p>
          )}
        </LeaderboardWrapper>
      </Container>
    </Layout>
  );
};
const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  .text-center {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    justify-content: space-between;
  }
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.textSize.xlarge};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.secondaryFont};
  color: ${({ theme }) => theme.colors.textColor};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.textSize.medium};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textColor};
`;

const ImageWrapper = styled.div`
  margin-bottom: 2rem;
`;

const LeaderboardWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};

  h2 {
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    border-radius: 8px;
    overflow: hidden;
  }

  thead {
    background-color: ${({ theme }) => theme.colors.accentColor1};
    color: white;
  }

  th,
  td {
    padding: 12px 15px;
    text-align: center;
    color: ${({ theme }) => theme.colors.textColor};
  }

  tbody tr {
    background-color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:first-child {
    color: ${({ theme }) => theme.colors.accentColor2};
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.hoverColor};
  }

  th {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.textSize.medium};
  }

  td {
    font-size: ${({ theme }) => theme.textSize.small};
  }

  .first {
    font-size: 1.8rem;
    color: gold;
  }

  .second {
    font-size: 1.4rem;
    color: silver;
  }

  .third {
    font-size: 1em;
    color: brown;
  }

  @media (max-width: 600px) {
    table {
      font-size: 0.9rem;
    }
  }
`;

export default Home;
