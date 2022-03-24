import React from "react";
import Container from "./container";
import Nav from "./nav";
import Intro from "./intro";

export default function PageLayout(props) {
  const { children, title } = props;

  return (
    <Container>
      <Nav />
      <Intro title={title} />
      {children}
    </Container>
  );
}
