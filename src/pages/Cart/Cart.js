import { motion } from "framer-motion";
import React from "react";
import { ROUTER_VARIANTS } from "../../App";
import MainCart from "./MainCart";
import SideBar from "./SideBar";

const Cart = () => {
  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className=" section mt-6"
    >
      <div className="columns is-centered">
        <div className="column is-6">
          <MainCart />
        </div>
        <div className="column is-3">
          <SideBar />
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
