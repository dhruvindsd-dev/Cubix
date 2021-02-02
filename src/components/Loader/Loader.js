import React from "react";
import "./Loader.css";
const Loader = (props) => {
  return (
    <div className="has-text-centered section is-meduim">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {props.chilren}
    </div>
  );
};

export default Loader;
