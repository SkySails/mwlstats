import React from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "./Common";
import { size } from "@Constants/devices";

export default function WelcomeCard({ setIsNewUser }) {
  return (
    <CardContainer>
      <TextContent>
        <h2>Welcome to mwlStats, Malte!</h2>
        <p>
          It's great to see you! Let's dive headfirst into a world full of data,
          provided by none other than your humble self and your passion for
          flight!
        </p>
        <div className="button-container">
          <PrimaryButton color="white" className="ripple">
            Show me around!
          </PrimaryButton>
          <SecondaryButton onClick={() => setIsNewUser(false)}>
            Dismiss
          </SecondaryButton>
        </div>
      </TextContent>
      <GraphicsContent></GraphicsContent>
    </CardContainer>
  );
}

const CardContainer = styled.article`
  width: 100%;
  padding: 20px;
  min-height: 230px;
  border-radius: 7px;
  background: linear-gradient(-120deg, #0067ee 0%, #0052be 100%);
  display: flex;
  flex-direction: row;
`;

const TextContent = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-family: "Poppins";
    color: white;
    font-size: 2.2em;
    margin: 0;
  }

  p {
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: bold;
  }

  .button-container {
    margin: -5px;
    button {
      margin: 5px;
    }
  }
`;

const GraphicsContent = styled.section`
  @media (max-width: ${size.laptop}) {
    display: none;
  }
  flex: 1.4;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/img/welcome-graphics.png") no-repeat right;
  background-position-x: 80%;
`;
