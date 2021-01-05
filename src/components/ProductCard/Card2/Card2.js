import React from "react";
import { connect } from "react-redux";
import cube from "../../../assets/images/HomeHeroCube.png";

const Card2 = (props) => {
  return (
    <React.Fragment>
      <div
        className="columns has-background-dark  mb-3 hover_scale is-mobile"
        style={{ padding: 0, margin: 0 }}
      >
        <div className="column is-3 column_img">
          <figure className="image is-square">
            <img src={cube} alt="" />
          </figure>
        </div>
        <div className="column ">
          <p className="is-size-4 is-size-6-mobile has-text-weight-bold has-text-light">
            {props.title}
            {props.id}
          </p>
          {props.availibility ? (
            <p
              className={
                "l-opacity is-size-7 " + props.availibility
                  ? "has-text-success"
                  : "has-text-danger"
              }
            >
              {props.availibility ? "In Stock" : "Out Of Stock"}
              {props.children}
            </p>
          ) : (
            <p>Ordered On {props.date}</p>
          )}
        </div>
        <div className="column has-text-right is-relative">
          <p className="is-size-5 has-text-light l-opacity">
            <sup>₹</sup>
            {props.price}
          </p>
          {props.removeItem ? (
            <button
              style={{ position: "absolute", bottom: "0px", right: "0px" }}
              className="m-3 button is-primary is-small"
              onClick={props.removeItem}
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Card2);
