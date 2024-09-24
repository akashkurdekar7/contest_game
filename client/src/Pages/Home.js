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
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;
const Heading = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

const ImageWrapper = styled.div`
  margin-bottom: 2rem;
`;

const LeaderboardWrapper = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-transform: uppercase;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  thead {
    background-color: #4caf50;
    color: white;
  }
  th,
  td {
    padding: 12px 15px;
    text-align: center;
  }
  tbody tr {
    background-color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tbody tr:first-child() {
    color: red;
  }

  tbody tr:hover {
    background-color: #e0f7fa;
  }

  th {
    font-weight: bold;
    font-size: 1.1rem;
  }

  td {
    font-size: 1rem;
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
      font-size: 0.9rem; /* Adjust font size for smaller screens */
    }
  }
`;

export default Home;
