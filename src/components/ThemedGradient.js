import React from "react";
import styled from "styled-components";

export default function ThemedGradient({ children }) {
  return (
    <GradientContainer className="themed-gradient-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="50%"
        preserveAspectRatio="none"
        viewBox="0 0 618 446"
        style={{
          zIndex: 2,
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: "var(--bg-primary)",
                stopOpacity: 0,
                transition: ".2s",
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "var(--bg-primary)",
                stopOpacity: 1,
                transition: ".2s",
              }}
            />
          </linearGradient>
        </defs>
        <rect className="a" width="100%" height="100%" fill="url(#grad2)" />
      </svg>
      {children}
    </GradientContainer>
  );
}

const GradientContainer = styled.div`
  overflow: hidden;
  position: relative;
  max-height: 170px;
`;
