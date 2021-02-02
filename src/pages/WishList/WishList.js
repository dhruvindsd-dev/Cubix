import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { axiosInstance, CACHE, ROUTER_VARIANTS } from "../../App";
import Loader from "../../components/Loader/Loader";
import Card2 from "../../components/ProductCard/Card2/Card2";

const WishList = () => {
  // const [WishList, setWishList] = useState([]);
  const [State, setState] = useState({
    isLoading: false,
    data: [],
  });
  useEffect(() => {
    if (CACHE.has("/wishlist")) {
      setState({
        ...State,
        data: CACHE.get("/wishlist"),
      });
    } else {
      setState({
        ...State,
        isLoading: true,
      });
      axiosInstance.get("get-user-wishlist").then((response) => {
        setState({
          isLoading: false,
          data: response.data.products,
        });
        CACHE.set("/wishlist", response.data.products);
      });
    }
  }, []);
  const handleRemove = (id) => {
    axiosInstance.put(`wishList/remove/${id}`).then(() => {});
    const list = State.data.filter((item) => item.id !== id);
    setState({
      ...State,
      data: list,
    });
  };
  let wishlist;
  if (State.isLoading) wishlist = <Loader />;
  else if (State.data.length === 0)
    wishlist = <p className="is-size-6">No Items Found In WishList</p>;
  else
    wishlist = State.data.map((item, i) => (
      <div className="column is-4">
        <Card2
          title={item.title}
          price={item.price}
          discount={item.discount}
          id={item.id}
          removeClick={handleRemove.bind(this, item.id)}
          key={i}
        />
      </div>
    ));
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
      <div className="columns section is-multiline">{wishlist}</div>
    </motion.div>
  );
};
export default WishList;
