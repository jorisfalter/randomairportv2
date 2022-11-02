import React from "react";

function sayHello() {
  alert("You clicked me!");
}

function Button() {
  return <button onClick={sayHello}>Next</button>;
}

export default Button;
