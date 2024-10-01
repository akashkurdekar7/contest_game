import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import axios from "axios";
import { FaCrown } from "react-icons/fa";
import { useTheme } from "styled-components";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all-users");
      const sortedUsers = res.data.users
        .map((user) => {
          const startTime = new Date(user.startTime);
          const endTime = new Date(user.endTime);
          const timeTaken = (endTime - startTime) / 1000;

          return {
            ...user,
            totalScore: user.totalScore || 0,
            timeTaken,
          };
        })
        .sort((a, b) => {
          if (b.totalScore === a.totalScore) {
            return a.timeTaken - b.timeTaken;
          }
          return b.totalScore - a.totalScore;
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
      <Wrapper>
        <h2 className="title">Leaderboard</h2>
        <LeaderboardWrapper>
          {loading ? (
            <LoadingMessage>Loading users...</LoadingMessage>
          ) : users.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Score</th>
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
                    <td>{user.timeTaken.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <NoUsersMessage>No users registered yet.</NoUsersMessage>
          )}
        </LeaderboardWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  position: relative;
  .title {
    text-align: center;
  }
`;

const LeaderboardWrapper = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 15px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  h2 {
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    color: ${({ theme }) => theme.colors.accentColor1};
    font-size: ${({ theme }) => theme.textSize.xlarge};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.accentColor1};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: transparent;

  thead {
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    color: ${({ theme }) => theme.colors.whiteColor};
  }

  th,
  td {
    padding: 12px 15px;
    text-align: center;
    color: ${({ theme }) => theme.colors.whiteColor};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverColor};
    }
  }

  tbody tr {
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.accentColor1};
    }
  }

  tbody tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.08);
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
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.accentColor1};
`;

const NoUsersMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.whiteColor};
`;

export default LeaderBoard;
