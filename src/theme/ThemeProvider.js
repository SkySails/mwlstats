import React, { useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { COLORS } from "./main.style";

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "light";
}

function getThemeByColor(color) {
  let theme = Object.entries(COLORS).reduce((acc, curr) => {
    console.log(curr);
    acc[curr[0]] = curr[1][color];
    return acc;
  }, {});

  console.log("Theme prop will be", theme);
  return theme;
}

export const ThemeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(getInitialColorMode());
  return (
    <StyledThemeProvider theme={getThemeByColor(colorMode)}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
