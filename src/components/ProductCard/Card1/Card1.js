import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { withRouter } from "react-router";
import Cube from "../../../assets/images/products/megamix.webp";
// import "./card1.css";
const parentVarient = {
  initial: {},
  animate: {},
  hover: {
    scale: 1.05,
    backgroundColor: "#3a3a3a",
  },
};
const childVariant = {
  initial: {},
  animate: {},
  hover: {
    rotate: 45,
    scale: 1.2,
  },
};
const Card1 = (props) => {
  let rating = Array(props.smallCardObj.rating)
    .fill(1)
    .map((item, i) => <i key={i} className="fas fa-star has-text-warning"></i>);
  return (
    <motion.div
      variants={parentVarient}
      onClick={() => {
        props.history.push(`/product/${props.smallCardObj.id}`);
      }}
      initial="initial"
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
            <motion.img variants={childVariant} src={Cube} alt="" />
          </AnimatePresence>
        </figure>
      </div>
      <div className="content has-text-light mt-3">
        <p className="is-size-4 mb-1 hover-pointer">
          {props.smallCardObj.title}
        </p>
        <p className="is-size-7 mb-1">
          <span>
            <span className="less-opacity">Rating : </span>
            {rating}
          </span>
        </p>
        <span className="is-size-5">
          <sup>₹</sup>
          {Math.floor(
            props.smallCardObj.price -
              (props.smallCardObj.price * props.smallCardObj.discount) / 100
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
