import React from "react";

const Modal = (props) => {
  return (
    <div className="modal is-active ">
      <div className="modal-background"></div>
      <div className="modal-content notification is-light">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
