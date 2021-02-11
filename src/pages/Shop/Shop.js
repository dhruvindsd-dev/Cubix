import React from "react";
import GridList from "./Grid/GridList";
import cubeImg from "../../assets/images/homeBanner.jpg";
import { motion } from "framer-motion";
import { ROUTER_VARIANTS } from "../../App";
import BennifitContentList from "./BennifitContentList/BennifitContentList";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HomeNewProduct />
      <BennifitContentList />
      <GridList />
    </motion.div>
  );
};
// for future use. if wanna render dynamically
const HomeNewProduct = () => (
  <div className="columns section is-medium is-centered pb-4">
    <div className="column is-5">
      <div>
        <figure className="image">
          <img src={cubeImg} />
        </figure>
      </div>
    </div>
    <div className="column is-1"></div>
    <div className="column is-4 section pt-0">
      <div className=" has-text-light">
        <p className="title is-spaced has-text-weight-bold is-size-3-desktop is-size-4-touch  has-text-primary">
          Introducing Yj Yulong 3X3 Speed Cube.
        </p>
        <p className="subtitle has-text-white  is-size-4-desktop is-size-6-touch l-opacity">
          A perfect balance of exhilarating smoothness and exceptional design.
        </p>
        <br />
        <Link to="/product/1" className="button is-primary is-rounded is-large">
          Buy Now
        </Link>
      </div>
    </div>
  </div>
);
export default Shop;
