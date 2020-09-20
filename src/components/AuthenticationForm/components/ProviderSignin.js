import React from "react";
import styled from "styled-components";
import { Google, Facebook } from "@Icons";

export default function ProviderSignin({ mode }) {
  return (
    <FormSection>
      <span>
        {mode === "signin"
          ? "Or sign in with"
          : "Get a headstart by signing in with"}
      </span>
      <div className="providers">
        <ProviderButton id="google-siginin" onClick={(e) => e.preventDefault()}>
          <Google />
          Google
        </ProviderButton>
        <ProviderButton
          id="facebook-siginin"
          onClick={(e) => e.preventDefault()}
        >
          <Facebook />
          Facebook
        </ProviderButton>
      </div>
    </FormSection>
  );
}

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  span {
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .providers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const ProviderButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  flex: 1;
  position: relative;

  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #d0dff4;
  border-radius: 7px;
  font-family: inherit;
  font-weight: bold;
  font-size: 1em;
  color: var(--text-primary);

  cursor: pointer;
  outline: none;

  transition: 0.2s;

  &:hover {
    background: var(--bg-contrast);
    color: var(--bg-primary);
  }

  &:focus {
    box-shadow: 0 0 0 4px var(--boxshadow-select),
      0 3px 15px 0 rgba(0, 0, 0, 0.05);
  }

  &:first-child {
    margin-right: 20px;
  }

  svg {
    height: 50%;
  }
`;
