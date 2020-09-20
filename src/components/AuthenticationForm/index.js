import React from "react";
import Link from "next/link";

import styled from "styled-components";
import { ShareOutline } from "@Icons";
import { device } from "@Constants/devices";

import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import ProviderSignin from "./components/ProviderSignin";
import { SubmitButton } from "@Components/Common";
import { useRouter } from "next/router";
import OnboardingSlider from "./components/OnboardingSlider";
import { useForm } from "react-hook-form";

export default function AuthenticationForm({ type, callback }) {
  const Router = useRouter();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (options) => {
    try {
      if (type === "login") {
        console.log("Logged in!", options);
        if (
          options.email === "malte@skyfoxinteractive.com" &&
          options.password === "Maltehall12"
        )
          Router.push("/app/dashboard");
      } else if (type === "signup") {
        console.log("Signed up!", options);
      }
    } catch (e) {
      console.error("The following error ocurred on form submit:", e);
    }
  };

  switch (type) {
    case "login": {
      return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} className="max-width">
          <h1>Sign in</h1>
          <EmailInput
            name="email"
            id="email"
            autoComplete="email"
            error={errors.email}
            ref={register({
              required: "An email adress is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <PasswordInput
            name="password"
            id="password"
            autoComplete="password"
            error={errors.password}
            ref={register({
              required: "A password is required",
            })}
          />
          <SubmitButton className="ripple">
            Sign in
            <ShareOutline />
          </SubmitButton>
          <ProviderSignin mode="signin" />
          <div className="auth-nav">
            <span>Not registered?</span>
            <Link href="/signup">
              <a>Create a new account</a>
            </Link>
          </div>
        </FormContainer>
      );
    }
    case "signup": {
      return (
        <FormContainer>
          <OnboardingSlider />
          <div className="auth-nav">
            <span>Got an account already?</span>
            <Link href="/login">
              <a>Sign in</a>
            </Link>
          </div>
        </FormContainer>
      );
    }
    default: {
      break;
    }
  }
  return null;
}

const FormContainer = styled.div`
  &.max-width {
    width: 90%;
    max-width: 350px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  .slider {
    width: 100%;

    & > div {
      display: flex;
      align-items: center;
    }
  }

  h1 {
    align-self: flex-start;
    font-size: 2.7em;
    margin: 0;
    font-family: "Poppins";
    /* text-transform: uppercase; */
  }

  p {
    font-weight: 600;
    margin-top: 10px;
  }

  .site-name {
    color: var(--primary-color);
  }

  input {
    align-self: flex-start;
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 7px;
    padding: 12px 10px;
    background: var(--bg-form);
    color: var(--text-primary);
    font-weight: bold;
    font-family: inherit;
    font-size: 1em;
    outline: none;
    transition: all 0.2s;

    &:focus {
      box-shadow: 0 0 0 3px var(--primary-color);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:active {
      border-radius: 7px;
      border: 1px solid var(--primary-color);
      box-shadow: 0 0 0px 1000px var(--bg-form-autofill) inset;
      -webkit-text-fill-color: var(--text-primary) !important;
      caret-color: var(--text-primary);
      background-color: transparent;
    }
    &:-webkit-autofill:focus {
      border-radius: 7px;
      box-shadow: 0 0 0px 1000px var(--bg-form) inset,
        0 0 0 3px var(--primary-color);
    }

    /* If input is in error state, a different border + box-shadow is shown */

    &.error {
      border: 1px solid red;

      &:focus {
        box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
      }
    }
  }

  .auth-nav {
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
