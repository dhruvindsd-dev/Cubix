import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  axiosInstance,
  Card2StaggerChild,
  Card2StaggerParent,
} from "../../App";
import Loader from "../../components/Loader/Loader";
import Card2 from "../../components/ProductCard/Card2/Card2";
import { LOAD_CART, REMOVE_ITEM } from "../../store/actions/actions";

const MainCart = (props) => {
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (props.isAuthenticated)
      if (!props.hasCartLoaded) {
        setIsLoading(true);
        axiosInstance.get("get-user-cart").then((response) => {
          props.loadCart(response.data.products);
          setIsLoading(false);
        });
      }
  }, []);

  const handleRemoveItem = (id) => {
    if (props.isAuthenticated)
      axiosInstance.put(`cart/remove/${id}`).then(() => {
        props.removeItem(id);
      });
    else props.removeItem(id);
  };

  let cartItems;
  if (IsLoading) cartItems = <Loader />;
  else if (props.cart.length > 0)
    // if i dierctly assign props to cartItems staggering will not work
    cartItems = (
      <motion.div variants={Card2StaggerParent}>
        <AnimatePresence>
          {props.cart.map((item) => (
            <Card2
              title={item.title}
              price={item.price}
              discount={item.discount}
              id={item.id}
              img={item.img}
              removeClick={handleRemoveItem.bind(this, item.id)}
              key={item.id}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  else cartItems = <p>No Items Found In The Cart </p>;
  return cartItems;
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    hasCartLoaded: state.cart.hasCartLoaded,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch({ type: REMOVE_ITEM, payload: { id: id } });
    },
    loadCart: (cart) => {
      dispatch({ type: LOAD_CART, payload: { cart: cart } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCart);
