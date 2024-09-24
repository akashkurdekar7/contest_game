import Layout from "../Components/Layout";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Profile = () => {
  const [user, setUser] = useState({
    slug: "",
    age: "",
    number: "",
  });

  // Retrieve user details when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      console.log(storedUser); // Log the retrieved user data
      setUser(storedUser);
    }
  }, []);

  return (
    <Layout>
      <Details>
        <h1>Name: {user.slug || "No Name Available"}</h1>
        <h1>Age: {user.age || "No Age Provided"}</h1>
        <h1>Gender: {user.gender || "No Phone Number Available"}</h1>
        <h1>Phone Number: {user.number || "No Phone Number Available"}</h1>
      </Details>
    </Layout>
  );
};
const Details = styled.div`
  background-color: black;
  color: white;
  h1 {
    color: white;
    font-size: 2rem;
  }
`;
export default Profile;
