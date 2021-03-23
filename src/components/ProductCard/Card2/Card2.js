import { motion } from "framer-motion";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card2StaggerChild } from "../../../App";
import { getPriceFromDiscount } from "../../../shared";

const Card2 = ({
  title,
  id,
  price,
  discount,
  img,
  removeClick = null,
  date = false,
}) => (
  <motion.div
    variants={Card2StaggerChild}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, x: -100, rotateZ: -10 }}
    className="columns has-background-dark  mb-3 hover_scale is-mobile"
    style={{ padding: 0, margin: 0 }}
  >
    <div className="column is-3 column_img">
      <figure className="image is-square">
        <img src={img} alt="" />
      </figure>
    </div>
    <div className="column is-5">
      <p className="is-size-4 is-size-6-touch has-text-weight-bold has-text-light">
        <Link to={`/product/${id}`} className="l-opacity">
          {title}
        </Link>
      </p>
      {date && <p>Ordered On {date}</p>}
    </div>
    <div className="column has-text-right">
      <p className="is-size-5-desktop has-text-light l-opacity">
        <sup>₹</sup>
        {getPriceFromDiscount(price, discount)}
      </p>
      {removeClick ? (
        <button
          className="button is-primary is-small is-outlined mt-1"
          onClick={removeClick}
        >
          Remove
        </button>
      ) : null}
    </div>
  </motion.div>
);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Card2);
