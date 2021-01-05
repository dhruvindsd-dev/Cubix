import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance, CACHE, routesVariants } from "../../App";
import Modal from "../../components/Modal/Modal";
import Card2 from "../../components/ProductCard/Card2/Card2";
import {
  CLEAR_CART,
  LOAD_CART,
  REMOVE_ITEM,
} from "../../store/actions/actions";

const Cart = (props) => {
  const [OrderModal, setOrderModal] = useState(false);
  useEffect(() => {
    if (props.isAuthenticated) {
      if (!props.isCartSync) {
        axiosInstance.get("get-user-cart").then((response) => {
          props.loadCart(response.data.products);
        });
      }
    }
  }, []);
  const handleOrder = () => {
    axiosInstance.get("/place-order").then((response) => {
      props.clearCart();
      // to sysnc the user with the latest orders
      CACHE.delete("/orders");
      props.history.push("/orders");
    });
  };
  const handleRemoveItem = (id) => {
    if (props.isAuthenticated) {
      axiosInstance.put(`cart/remove/${id}`).then((response) => {});
    }
    props.removeItem(id);
  };
  let cartItems = <p>No Items Found In The Cart </p>;
  if (props.cart.length > 0) {
    // map items to cards
    cartItems = props.cart.map((item, i) => {
      return (
        <Card2
          title={item.title}
          availibility={item.avalibility}
          price={item.price}
          discount={item.discount}
          id={item.id}
          removeItem={handleRemoveItem.bind(this, item.id)}
          key={i}
        ></Card2>
      );
    });
  }

  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className=" section mt-6"
    >
      {OrderModal ? (
        <Modal>
          <p className="is-size-4 has-text-weight-semibold mb-3">
            This Is Just A Portfolio Project. Dont expect the product Delivered.
            If You Wanna Place A Order Anyways Click On The Button Below
          </p>
          <button
            onClick={handleOrder}
            className="button is-link is-light is-outlined is-large is-fullwidth "
          >
            Confirm Order
          </button>
        </Modal>
      ) : null}
      <nav className="navbar is-black  is-hidden-tablet is-fixed-bottom">
        <div className="navbar-item">
          <button className="button is-primary is-fullwidth">
            Place Order
          </button>
        </div>
      </nav>
      <div className="columns is-centered">
        <div className="column is-6">{cartItems}</div>
        <div className="column is-3">
          <div className="notification is-dark my-3">
            <p className="mb-2 ">Have A Coupon ? </p>
            <input type="text" className="input" />
          </div>
          <Details cart={props.cart} />
          <button
            onClick={() => {
              setOrderModal(true);
            }}
            className="button is-primary is-fullwidth mt-2"
          >
            Place Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Details = ({ cart }) => {
  let billingDetails = null;
  let total = null;
  if (cart.length > 0) {
    billingDetails = cart.map((item, i) => {
      total += Math.floor(item.price - (item.price * item.discount) / 100);
      return (
        <div className="columns is-mobile" key={i}>
          <div className="column">
            <span>{item.title}</span>
          </div>
          <div className="column has-text-right">
            <span>
              <span
                className="mx-1"
                style={{
                  textDecoration: !!item.discount ? "line-through" : "",
                  color: !!item.discount ? "red" : "",
                }}
              >
                ₹{item.price}
              </span>
              {!!item.discount ? (
                <span>
                  - ₹
                  {Math.floor(item.price - (item.price * item.discount) / 100)}
                </span>
              ) : null}
            </span>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <p className="l-opacity mb-2">Billing Details</p>
      <div className="notification is-dark">
        {billingDetails}
        <div className="columns  is-mobile has-text-light">
          {!!total ? (
            <>
              <div className="column">Total</div>
              <div className="column has-text-right">₹{total}</div>{" "}
            </>
          ) : (
            <p className="l-opacity">No Items In The Cart</p>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    isCartSync: state.cart.isCartSync,
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
    clearCart: () => {
      console.log("clearing cart");
      dispatch({ type: CLEAR_CART, payload: {} });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
