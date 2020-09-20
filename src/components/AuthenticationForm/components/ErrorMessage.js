import React from "react";
import styled from "styled-components";
import { AlertOutline } from "src/icons";

export default function ErrorMessage({ htmlFor, error }) {
  return (
    <ErrorLabel htmlFor={htmlFor}>
      <AlertOutline color="red" />
      {error}
    </ErrorLabel>
  );
}

const ErrorLabel = styled.label`
  color: red;
  stroke: red;
  font-size: 23px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    font-size: 23px;
  }
`;
