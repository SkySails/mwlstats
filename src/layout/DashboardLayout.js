import React from "react";
import styled from "styled-components";
import Logo from "@SVG/Logo";
import { useAuth } from "@Context/AuthContext";

export default function DashboardLayout({ children }) {
  const { signout } = useAuth();

  return (
    <GridContainer>
      <LogoContainer>
        <Logo></Logo>
      </LogoContainer>
      <Nav></Nav>
      <Header>
        <h1>Dashboard</h1>
        <img src="/img/avatar.png" onClick={signout} />
      </Header>
      <Content>{children}</Content>
    </GridContainer>
  );
}

const GridContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    "Logo Header"
    "Nav Content";

  .Header {
    grid-area: Header;
  }

  .Nav {
    grid-area: Nav;
  }
`;

const LogoContainer = styled.div`
  grid-area: Logo;
  padding: 10px;
  background: #002959;
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);

  .logo-graphics {
    height: 100%;
  }
`;
const Nav = styled.div`
  grid-area: Nav;
  background: #002959;
`;
const Header = styled.div`
  grid-area: Header;
  background: var(--bg-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  h1 {
    font-family: "Poppins";
    color: var(--text-primary);
  }
`;
const Content = styled.div`
  padding: 1em;
  grid-area: Content;
  background: var(--bg-primary);
`;
