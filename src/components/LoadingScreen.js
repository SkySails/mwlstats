import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import loadingAnim from "@Animations/airplaneLoading.json";

export default function LoadingScreen() {
  return (
    <Loader>
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
    </Loader>
  );
}

const Loader = styled.div`
  background: var(--bg-primary);
  color: var(--form-title);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
`;
