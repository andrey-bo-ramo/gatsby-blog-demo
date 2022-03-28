import React from "react";

function HOC(Component, params) {
  function Wrapper(props) {
    return <Component {...props} {...params} />;
  }
  return Wrapper;
}

function Button(props) {
  const { text, bg, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md ${bg} text-white`}
    >
      {text}
    </button>
  );
}

export const LikeButton = HOC(Button, {
  bg: "bg-green-500",
  onClick: () => console.log("Like Btn Click"),
});

export const DislikeButton = HOC(Button, { bg: "bg-red-500" });
