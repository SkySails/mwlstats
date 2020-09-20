import React from "react";
import styled from "styled-components";
import Analytics from "@SVG/Analytics";
import { SubmitButton } from "@Components/Common";
import { NextArrow } from "@Icons";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import ProviderSignin from "../ProviderSignin";

const nextButton = (e, slider) => {
  e.preventDefault();
  slider.nextSlide();
};

const onSubmit = (options) => {
  console.log(options);
};

export function Intro({ className, slider, form }) {
  return (
    <StepContainer style={{ width: "100%" }} className={className}>
      <h1>
        Get started with <span className="site-name">mwlStats</span>
      </h1>
      <p>
        A wide range of statistics based on your own logbook is only a few
        clicks away! Let's get started by registering your free account.
      </p>

      <Analytics />
      <SubmitButton className="ripple" onClick={(e) => nextButton(e, slider)}>
        Let's go!
        <NextArrow />
      </SubmitButton>
    </StepContainer>
  );
}

export function Step1({ className, slider, form }) {
  const { register, errors, trigger } = form;

  return (
    <form className={className}>
      <h1>Account details</h1>
      <p>
        Choose wether to sign up using email and password, or a provider of your
        choice!
      </p>

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
      <SubmitButton
        className="ripple"
        onClick={async (e) => {
          e.preventDefault();
          const result = await trigger(["email", "password"]);
          if (result) slider.nextSlide(e);
        }}
      >
        Continue
        <NextArrow />
      </SubmitButton>
      <ProviderSignin mode="signup " />
    </form>
  );
}

export function Step2({ className, form, slider }) {
  const { register, errors, handleSubmit, trigger } = form;

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <h1>myWebLog details</h1>
      <p>
        To get access to your statistics, mwlStats needs to connect to your{" "}
        <span className="site-name">myWebLog</span> account. For this to happen,
        we need your details!
      </p>

      <EmailInput
        name="mwlUsername"
        id="mwlUsername"
        autoComplete="mwlUsername"
        error={errors.mwlUsername}
        label="Username"
        ref={register({
          required: "A username is required",
          pattern: {
            value: /^\d+-[\d]{4}$/i,
            message: "Invalid username",
          },
        })}
      />
      <PasswordInput
        name="mwlPassword"
        id="mwlPassword"
        autoComplete="mwlPassword"
        error={errors.mwlPassword}
        ref={register({
          required: "A password is required",
        })}
      />
      <SubmitButton
        className="ripple"
        onClick={async (e) => {
          const isValid = await trigger();

          if (isValid) {
            handleSubmit(onSubmit);
          } else {
            if (errors.email || errors.password) slider.setSlide(1);
          }
        }}
      >
        Create account
        <NextArrow />
      </SubmitButton>
    </form>
  );
}

export default {
  Intro,
  Step1,
  Step2,
};

const StepContainer = styled.div`
  width: 100%;
`;
