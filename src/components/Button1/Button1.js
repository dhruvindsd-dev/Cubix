import React from "react";

const Button1 = ({ load, text }) => {
  return (
    <button className={"button " + (load ? "is-loading" : "")}>{text}</button>
  );
};

export default Button1;
