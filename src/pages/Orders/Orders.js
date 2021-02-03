import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { axiosInstance, CACHE, ROUTER_VARIANTS } from "../../App";
import Loader from "../../components/Loader/Loader";
import Card2 from "../../components/ProductCard/Card2/Card2";
import useFetchWithCache from "../../Hooks/Fetch";
import SideBar from "./SideBar";

const Orders = (props) => {
  const [data, isLoading] = useFetchWithCache(
    "/get-user-orders",
    props.match.path
  );
  let orders;
  if (isLoading) orders = <Loader />;
  else if (data.length === 0)
    orders = (
      <p>
        No Previous Order Found. <Link to="/shop">Click here</Link> to shop
        latest cubes
      </p>
    );
  else
    orders = data.map((item, i) => (
      <Card2
        title={item.title}
        date={item.date}
        price={item.price}
        discount={item.discount}
        id={item.id}
        key={i}
      />
    ));

  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section"
    >
      <div className="columns is-centered">
        <SideBar />
        <div className="column is-6">
          <p className="mb-3">My Orders</p>
          {orders}
        </div>
      </div>
    </motion.div>
  );
};
export default withRouter(Orders);
