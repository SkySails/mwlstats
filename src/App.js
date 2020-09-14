import React from "react";
import styled from "styled-components";

export default function App() {
  return (
    <Container>
      <button className="ml-button large primary">Testknapp</button>
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme["bg-primary"]};
  height: 100vh;
`;
