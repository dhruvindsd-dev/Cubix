import { motion } from "framer-motion";
import React from "react";
import { withRouter } from "react-router";
import {
  axiosInstance,
  Card2StaggerChild,
  Card2StaggerParent,
  ROUTER_VARIANTS,
} from "../../App";
import Loader from "../../components/Loader/Loader";
import Card2 from "../../components/ProductCard/Card2/Card2";
import useFetchWithCache from "../../Hooks/Fetch";

const WishList = (props) => {
  const [data, isLoading, setData] = useFetchWithCache(
    "/get-user-wishlist",
    props.match.path
  );
  const handleRemove = (id) => {
    axiosInstance.put(`wishList/remove/${id}`).then(() => {});
    const list = data.filter((item) => item.id !== id);
    setData(list);
  };
  let wishlist;
  if (isLoading) wishlist = <Loader />;
  else if (data.length === 0)
    wishlist = <p className="is-size-6">No Items Found In WishList</p>;
  else
    wishlist = (
      <motion.div
        className="columns section is-multiline"
        variants={Card2StaggerParent}
      >
        {data.map((item, i) => (
          <motion.div
            variants={Card2StaggerChild}
            className="column is-4"
            key={i}
          >
            <Card2
              title={item.title}
              price={item.price}
              discount={item.discount}
              id={item.id}
              img={item.img}
              removeClick={handleRemove.bind(this, item.id)}
            />
          </motion.div>
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
      <p className="is-size-3 has-text-weight-semibold is-size-4-mobile mb-3 ">
        My WishList
      </p>
      {wishlist}
    </motion.div>
  );
};
export default withRouter(WishList);
