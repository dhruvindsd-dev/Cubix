import React from "react";

const ErrorMsg = ({ errMsg, children = null }) => {
  return (
    <div
      className="notification is-danger is-light"
      style={{ border: "1px solid #cc0f35" }}
    >
      <p className="is-size-5 is-size-6-mobile has-text-weight-semibold">
        {errMsg}
      </p>
      {!!children ? <p className="is-size-6">{children}</p> : null}
    </div>
  );
};

export default React.memo(ErrorMsg);
