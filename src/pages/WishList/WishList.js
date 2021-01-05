import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { axiosInstance, CACHE, routesVariants } from "../../App";
import Card2 from "../../components/ProductCard/Card2/Card2";

const WishList = () => {
  const [WishList, setWishList] = useState([]);
  useEffect(() => {
    if (CACHE.has("/wishlist")) {
      setWishList(CACHE.get("/wishlist"));
    } else {
      axiosInstance.get("get-user-wishlist").then((response) => {
        setWishList(response.data.products);
        CACHE.set("/wishlist", response.data.products);
      });
    }
  }, []);
  const handleRemove = (id) => {
    axiosInstance.put(`wishList/remove/${id}`).then((response) => {});
    const list = WishList.filter((item) => item.id !== id);
    setWishList(list);
  };
  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section"
    >
      <p className="is-size-2 has-text-weight-semibold mb-3">My WishList</p>
      <div className="columns section is-multiline">
        {!!WishList.length ? (
          WishList.map((item, i) => (
            <div className="column is-4">
              <Card2
                title={item.title}
                availibility={item.avalibility}
                price={item.price}
                discount={item.discount}
                id={item.id}
                removeItem={handleRemove.bind(this, item.id)}
                key={i}
              />
            </div>
          ))
        ) : (
          <p className="is-size-6">No Items Found In WishList</p>
        )}
      </div>
    </motion.div>
  );
};
export default WishList;
