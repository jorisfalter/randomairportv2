import React from "react";

// this function to test only

const Child = ({ handleChild }) => {
  const func = () => {
    alert("child function");
  };
  return <button onClick={() => handleChild(func)}>Apply</button>;
};

export default Child;
