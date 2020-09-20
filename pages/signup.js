import React from "react";
import { useDarkMode } from "@Hooks";
import styled from "styled-components";
import { useColorScheme } from "@Context/ThemeContext";
import AuthLayout from "@Layout/AuthLayout";
import AuthenticationForm from "@Components/AuthenticationForm";
import ThemeToggle from "@Components/ThemeToggle";
import MemoBackgroundGraphics from "@SVG/BackgroundGraphics";

export default function signup() {
  return (
    <AuthLayout>
      <main>
        <AuthenticationForm type="signup" />
        <StyledThemeToggle />
      </main>
      <aside>
        <MemoBackgroundGraphics />
        <article style={{ color: "white" }}>
          <img src="img/cards.png" />
          <span className="title">Flights at a glance</span>
          <p>
            Throw yourself back in time by exploring your previous flightlogs!
            Search for flights carried out to your favourite destinations, sort
            by airborne time, filter by aircraft registration and much more!
          </p>
        </article>
      </aside>
    </AuthLayout>
  );
}

const StyledThemeToggle = styled(ThemeToggle)`
  position: absolute;
  top: 20px;
  left: 20px;
`;