import React from "react";
import GridList from "./Grid/GridList";
import graphicCube from "../../assets/images/cube1.jpg";
import { motion } from "framer-motion";
import { ROUTER_VARIANTS } from "../../App";
import BennifitContentList from "./BennifitContentList/BennifitContentList";

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
      <div className="">
        <figure className="image">
          <img src={graphicCube} />
        </figure>
      </div>
    </div>
    <div className="column is-1"></div>
    <div className="column is-4 section pt-0">
      <div className=" has-text-light">
        <p className="title is-spaced has-text-weight-bold is-size-3-desktop is-size-4-touch  has-text-primary">
          Introducing Dayan Cube.
        </p>
        <p className="subtitle has-text-white  is-size-4-desktop is-size-6-touch l-opacity">
          a perfect balance of exhilirating smoothness and exceptional design .
        </p>
        <br />
        <button className="button is-primary is-rounded is-large">
          Buy Now
        </button>
      </div>
    </div>
  </div>
);
export default Shop;
