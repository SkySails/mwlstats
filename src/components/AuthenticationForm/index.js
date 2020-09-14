import React from "react";
import Link from "next/link";

import styled from "styled-components";
import { ShareOutline } from "@Icons";
import { device } from "@Constants/devices";

export default function AuthenticationForm({ type }) {
  switch (type) {
    case "login": {
      return (
        <FormContainer>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <button className="ripple">
            Sign in
            <ShareOutline />
          </button>
          <div>
            <span>Not registered?</span>
            <Link href="#">
              <a>Create a new account</a>
            </Link>
          </div>
        </FormContainer>
      );
      break;
    }
    case "signup": {
      break;
    }
    default: {
      break;
    }
  }
  return null;
}

const FormContainer = styled.form`
  width: 90%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-weight: bold;
    font-size: 0.9em;
    margin-bottom: 5px;
    align-self: flex-start;
  }

  input {
    align-self: flex-start;
    width: 100%;
    border: 1px solid var(--border-form);
    border-radius: 5px;
    padding: 12px 10px;
    background: var(--bg-form);
    color: var(--text-primary);
    font-weight: bold;
    font-family: inherit;
    font-size: 1em;
    outline: none;
    transition: all 0.2s;

    &:focus {
      box-shadow: 0 0 0 3px var(--boxshadow-form);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:active {
      border-radius: 5px;
      box-shadow: 0 0 0px 1000px var(--bg-form-autofill) inset;
      -webkit-text-fill-color: var(--text-primary) !important;
      caret-color: var(--text-primary);
      background-color: transparent;
    }
    &:-webkit-autofill:focus {
      box-shadow: 0 0 0px 1000px var(--bg-form) inset,
        0 0 0 3px var(--boxshadow-form);
    }

    & + label {
      margin-top: 15px;
    }
  }

  button {
    align-self: flex-start;
    width: 100%;
    margin-top: 15px;
    border: none;
    border-radius: 5px;
    padding: 12px 10px;
    background: var(--primary-color);
    color: white;
    font-weight: bold;
    font-size: 1em;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;

    svg {
      margin-left: 10px;
      fill: white;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-top: 20px;
    font-size: 0.8em;

    @media ${device.laptop} {
      position: absolute;
      bottom: 30px;
    }

    a {
      margin-left: 7px;
      color: var(--primary-color);
    }
  }
`;
