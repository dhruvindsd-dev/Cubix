import React from "react";
import BennifitContentList from "./BennifitContentList/BennifitContentList";
import Grid from "./Grid/Grid";
import graphicCube from "../../assets/images/cube1.jpg";
import { motion } from "framer-motion";
import { routesVariants } from "../../App";

const Shop = () => {
  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <p className="has-text-primary section title">this is a shopping page</p>
      <HomeNewProduct />
      <BennifitContentList />
      <Grid />
    </motion.div>
  );
};

const HomeNewProduct = () => (
  <div className="columns section is-centered">
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
        <p className="is-size-1 has-text-weight-bold has-text-primary">
          Introducing Dayan Cube.
        </p>
        <p className="is-size-4 l-opacity">
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
