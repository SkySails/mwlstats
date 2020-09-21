import React, { useState, useEffect } from "react";
import Slider from "@Components/Slider";
import { Intro, Step1, Step2 } from "./Steps";
import { useForm } from "react-hook-form";
import { authApp } from "@Services/firebase/client";
import Lottie from "react-lottie";
import loadingAnim from "@Animations/loading.json";

export default function OnboardingSlider(props) {
  const form = useForm();
  const [initialSlide, setInitialSlide] = useState(0);
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    let unregister = authApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setInitialSlide(2);
        setInitialized(true);
      } else {
        setInitialSlide(0);
        setInitialized(true);
      }
    });
    return () => unregister();
  });

  return isInitialized ? (
    <Slider className="slider" initialSlide={initialSlide}>
      <Intro />
      <Step1 form={form} />
      <Step2 form={form} {...props} />
    </Slider>
  ) : (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loadingAnim,
      }}
      height={500}
      width={500}
      isClickToPauseDisabled={true}
    />
  );
}
