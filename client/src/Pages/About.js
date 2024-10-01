import React from "react";
import Layout from "./../Components/Layout";
import styled from "styled-components";

const About = () => {
  return (
    <Layout>
      <Container>
        <Heading>About the Contest</Heading>
        <Introduction>
          Welcome to ContestHub! Our contest is designed to bring together
          talented individuals from various backgrounds to showcase their skills
          and creativity. Whether you are a seasoned pro or a newcomer, we
          invite you to participate and win amazing prizes!
        </Introduction>

        <Section>
          <SectionHeading>Contest Details</SectionHeading>
          <Details>
            <p>
              The contest will take place over the next month, with participants
              required to complete a series of challenges that will test their
              abilities in different areas.
            </p>
            <ul>
              <li>
                <strong>Start Date:</strong> October 10, 2024
              </li>
              <li>
                <strong>End Date:</strong> November 10, 2024
              </li>
              <li>
                <strong>Eligibility:</strong> Open to all registered users
              </li>
              <li>
                <strong>Format:</strong> Online challenges
              </li>
            </ul>
          </Details>
        </Section>

        <Section>
          <SectionHeading>Rules</SectionHeading>
          <Rules>
            <p>Please read and adhere to the following rules:</p>
            <ol>
              <li>Participants must register to compete.</li>
              <li>All submissions must be original work.</li>
              <li>
                Participants can enter multiple challenges but can only win one
                prize.
              </li>
              <li>Plagiarism will result in disqualification.</li>
            </ol>
          </Rules>
        </Section>

        <Section>
          <SectionHeading>Prizes</SectionHeading>
          <Prizes>
            <p>Exciting prizes await our top participants:</p>
            <ul>
              <li>🏆 1st Place: $1000 Cash Prize</li>
              <li>🥈 2nd Place: $500 Gift Card</li>
              <li>🥉 3rd Place: $250 Gift Card</li>
              <li>🎉 Participation Certificates for all contestants</li>
            </ul>
          </Prizes>
        </Section>
      </Container>
    </Layout>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-family: ${({ theme }) => theme.fonts.secondaryFont};
`;

const Introduction = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textColor};
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin: 2rem 0;
  text-align: left;
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.accentColor1};
`;

const Details = styled.div`
  color: ${({ theme }) => theme.colors.textColor};
`;

const Rules = styled.div`
  color: ${({ theme }) => theme.colors.textColor};
`;

const Prizes = styled.div`
  color: ${({ theme }) => theme.colors.textColor};
`;

export default About;
