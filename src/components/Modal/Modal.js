import React from "react";

const Modal = (props) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.close}></div>
      <div className="modal-content notification is-light">
        <button className="delete" onClick={props.close}></button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
