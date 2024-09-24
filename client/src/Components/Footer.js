import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: black;
  color: white;
  padding: 1rem 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <p>&copy; 2023 ContestHub. All rights reserved.</p>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
