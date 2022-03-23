import React from "react";
import { HocButton } from "./buttons/hocButton";

function Button(props) {
  console.log("props", props);
  const { text, className } = props;
  return <button className={className}>{text}</button>;
}

export default HocButton(Button);
