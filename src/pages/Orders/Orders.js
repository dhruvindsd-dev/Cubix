import { motion } from "framer-motion";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Card2StaggerParent, ROUTER_VARIANTS } from "../../App";
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
    orders = (
      <motion.div variants={Card2StaggerParent}>
        {data.map((item, i) => (
          <Card2
            title={item.title}
            price={item.price}
            discount={item.discount}
            id={item.id}
            date={item.date}
            img={item.img}
            key={i}
          />
        ))}
      </motion.div>
    );

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
