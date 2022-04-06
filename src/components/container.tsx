import React from "react";

interface IContainerProps {
  children: Array<Element | JSX.Element>;
}

export default function Container({ children }: IContainerProps) {
  return <div className="container mx-auto px-5">{children}</div>;
}
