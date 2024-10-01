import Layout from "../Components/Layout";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../assets/profilebgc.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    slug: "",
    age: "",
    number: "",
    gender: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Layout>
      <Container>
        <BackgroundImage src={ProfileImg} alt="Profile Background" />
        <Overlay />
        <Details>
          <h1>Name: {user.slug || "No Name Available"}</h1>
          <h1>Age: {user.age || "No Age Provided"}</h1>
          <h1>Gender: {user.gender || "No Gender Provided"}</h1>
          <h1>Phone Number: {user.number || "No Phone Number Available"}</h1>
        </Details>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const Details = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.blackColor};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  height: auto;
  justify-content: space-evenly;

  &:hover {
    transform: translateY(-5px);
    background-color: ${({ theme }) => theme.colors.whiteColor};
    color: ${({ theme }) => theme.colors.accentColor1};
  }

  h1 {
    color: ${({ theme }) => theme.colors.accentColor2};
    font-size: ${({ theme }) => theme.textSize.large};
    font-family: ${({ theme }) => theme.fonts.primaryFont};
    margin: 0.5rem 0;
  }
`;

export default Profile;
