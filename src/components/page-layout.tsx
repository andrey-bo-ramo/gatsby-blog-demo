import React from "react";
import Container from "./container";
import Nav from "./nav";
import Intro from "./intro";

interface IPageLayoutProps {
  children: JSX.Element;
  title: string;
}

export default function PageLayout(props: IPageLayoutProps) {
  const { children, title } = props;

  return (
    <Container>
      <Nav />
      <Intro title={title} />
      {children}
    </Container>
  );
}
