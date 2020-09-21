import React, { useState, Fragment } from "react";
import styled from "styled-components";

import Analytics from "@SVG/Analytics";
import Profile from "@SVG/Profile";
import Airplane from "@SVG/Airplane";
import { NextArrow, ShareOutline } from "@Icons";
import ThemedGradient from "@Components/ThemedGradient";

import { SubmitButton } from "@Components/Common";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import ProviderSignin from "../ProviderSignin";

import { useForm } from "react-hook-form";
import { useAuth } from "@Context/AuthContext";
import Lottie from "react-lottie";
import checkAnim from "@Animations/check.json";
import PulseLoader from "react-spinners/PulseLoader";
import { authApp } from "@Services/firebase/client";

var authDetails = {};

const nextButton = (e, slider) => {
  e.preventDefault();
  slider.nextSlide();
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

export function Step1({ className, slider }) {
  const { register, errors, setError, handleSubmit } = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { signup } = useAuth();

  const onSubmitSignup = ({ email, password }) => {
    setIsFetching(true);
    signup(email, password)
      .then((user) => {
        console.log("User signed up with:", {
          email,
          password,
        });
        authDetails = {
          email,
          password,
        };
        setIsFetching(false);
        setIsSuccessful(true);
        setTimeout(() => {
          slider.nextSlide();
        }, 1500);
      })
      .catch((e) => {
        console.log("Error signing up:", e);
        switch (e.code) {
          case "auth/email-already-in-use": {
            setError("email", {
              type: "manual",
              message: "This email adress is already in use!",
            });
            break;
          }
        }
        setIsFetching(false);
      });
  };

  authApp
    .auth()
    .getRedirectResult()
    .then((result) => {
      authDetails = result;
    });

  return (
    <Fragment>
      {isSuccessful && (
        <Lottie
          style={{ position: "absolute", zIndex: 99 }}
          options={{
            loop: false,
            autoplay: true,
            animationData: checkAnim,
          }}
          height={200}
          width={200}
          isClickToPauseDisabled={true}
        />
      )}
      <form
        className={className}
        style={{
          position: "relative",
          opacity: isSuccessful ? 0 : 1,
          transition: "opacity .3s",
        }}
        onSubmit={handleSubmit(onSubmitSignup)}
      >
        <ThemedGradient>
          <ProfileGraphics />
        </ThemedGradient>
        <h1>Account details</h1>
        <p>
          Choose wether to sign up using email and password, or a provider of
          your choice!
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
        <SubmitButton className="ripple">
          {isFetching ? (
            <PulseLoader color={"white"} size={10} />
          ) : (
            <>
              Continue <NextArrow />
            </>
          )}
        </SubmitButton>
        <ProviderSignin mode="signup" />
      </form>
    </Fragment>
  );
}

export function Step2({ className, form, slider }) {
  const { register, errors, handleSubmit } = form;
  const { registerMWL, signinWithCredential, signin } = useAuth();

  const onFinalSubmit = ({ mwlUsername, mwlPassword }) => {
    registerMWL(mwlUsername, mwlPassword);
    const { credential, email, password } = authDetails;
    console.log(authDetails);
    if (credential) {
      signinWithCredential(credential).catch((e) => console.log(e));
    } else {
      signin(email, password).catch((e) => console.log(e));
    }
  };

  return (
    <form
      className={className}
      style={{ position: "relative" }}
      onSubmit={handleSubmit(onFinalSubmit)}
    >
      <ThemedGradient>
        <AirplaneGraphics />
      </ThemedGradient>
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
      <SubmitButton className="ripple">
        Create account
        <ShareOutline />
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

const ProfileGraphics = styled(Profile)`
  opacity: 0.8;
  width: 240px;
  margin: 0 auto;
  z-index: 1;
`;

const AirplaneGraphics = styled(Airplane)`
  opacity: 0.8;
  width: 250px;
  margin: 0 auto;
  z-index: 1;
`;
