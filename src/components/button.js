import React, { useState } from "react";

function HOC(Component) {
  function Wrapper(props) {
    const [count, setCount] = useState(0);
    const handleClick = () => {
      setCount(count + 1);
    };
    return <Component onClick={handleClick} count={count} {...props} />;
  }
  return Wrapper;
}

function Button(props) {
  const { text, bg, count, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md ${bg} text-white`}
    >
      {count}-{text}
    </button>
  );
}

export const LikeButton = HOC((props) => {
  return <Button {...props} />;
});

export const DislikeButton = HOC((props) => {
  return <Button {...props} />;
});
