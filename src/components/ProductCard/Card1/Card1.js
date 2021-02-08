import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { withRouter } from "react-router";
import { getPriceFromDiscount } from "../../../shared";
import Rating from "../../Rating/Rating";
const parentVarient = {
  hover: {
    scale: 1.05,
    backgroundColor: "#3a3a3a",
  },
};
const childVariant = {
  hover: {
    rotate: 45,
    scale: 1.2,
  },
};
const Card1 = (props) => {
  return (
    <motion.div
      variants={parentVarient}
      onClick={() => {
        props.history.push(`/product/${props.smallCardObj.id}`);
      }}
      whileHover="hover"
      className="notification hover-pointer is-dark"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <figure className="image is-128x128">
          <AnimatePresence>
            <motion.img
              variants={childVariant}
              src={props.smallCardObj.img}
              alt=""
            />
          </AnimatePresence>
        </figure>
      </div>
      <div className="content has-text-light mt-3">
        <p className="is-size-4 mb-1 hover-pointer">
          {props.smallCardObj.title}
        </p>
        <Rating num={props.smallCardObj.rating} />
        <span className="is-size-5">
          <sup>₹</sup>
          {getPriceFromDiscount(
            props.smallCardObj.price,
            props.smallCardObj.discount
          )}
        </span>
        <span
          className="is-size-7 ml-4"
          style={{ textDecoration: "line-through" }}
        >
          ₹{props.smallCardObj.price}
        </span>
        <br />
      </div>
      {props.children}
    </motion.div>
  );
};

export default withRouter(Card1);
