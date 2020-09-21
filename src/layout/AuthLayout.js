import React from "react";
import styled from "styled-components";
import { device } from "@Constants/devices";

export default function AuthLayout({ children }) {
  return <AuthContainer>{children}</AuthContainer>;
}

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: var(--bg-primary);
    color: var(--text-primary);
    transition: all 0.2s;
    overflow-x: hidden;
  }

  aside {
    display: none;
    @media ${device.laptop} {
      display: flex;
    }
    flex: 1.5;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: var(--bg-secondary);
    color: var(--text-secondary);
    transition: all 0.2s;
    overflow: hidden;
    position: relative;

    #bg-graphics {
      position: absolute;
      width: 60%;
      top: 0px;
      right: 0px;
      transform: translate(40%, -50%);
    }

    article {
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      img {
        width: 100%;
      }

      .title {
        font-size: 2.8em;
        font-weight: bold;
        font-family: "Poppins";
        position: relative;
        display: flex;
        align-items: center;

        &:after {
          content: ">";
          font-size: 0.6em;
          line-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: -50px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--primary-color);
        }
      }

      p {
        font-size: 1.2em;
        line-height: 27px;
      }
    }
  }
`;
