import React from "react";
import styled from "styled-components";

export const SubmitButton = styled.button`
  align-self: flex-start;
  width: 100%;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  padding: 12px 10px;
  background: linear-gradient(-45deg, #0067ee 0%, #1674ef 100%);
  box-shadow: 3px 3px 20px 0 #0268ee40;
  color: white;
  font-weight: bold;
  font-size: 1em;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  &:hover {
    background: linear-gradient(-45deg, #076df3 0%, #1e7bf3 100%);
  }

  svg {
    margin-left: 10px;
    fill: white;
  }
`;

export const PrimaryButton = styled.button`
  height: 45px;
  padding: 0 30px;
  background: ${(props) => props.color || "var(--primary-color)"};
  color: ${(props) => (props.color ? "var(--primary-color)" : "white")};
  font-size: 1em;
  border: none;
  border-radius: 7px;
  font-family: "Nunito";
  font-weight: bold;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  height: 45px;
  padding: 0 30px;
  background: transparent;
  color: ${(props) => (props.color ? "var(--primary-color)" : "white")};
  font-size: 1em;
  border: none;
  border-radius: 7px;
  font-family: "Nunito";
  font-weight: bold;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.color ? "var(--primary-color)" : "white")};
`;

export default {
  SubmitButton,
};
