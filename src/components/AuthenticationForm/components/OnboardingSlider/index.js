import React from "react";
import Slider from "@Components/Slider";
import { Intro, Step1, Step2 } from "./Steps";
import { useForm } from "react-hook-form";

export default function OnboardingSlider() {
  const form = useForm();

  return (
    <Slider className="slider">
      <Intro form={form} />
      <Step1 form={form} />
      <Step2 form={form} />
    </Slider>
  );
}
