import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance, CACHE, routesVariants } from "../../App";
import Card2 from "../../components/ProductCard/Card2/Card2";
import { LOGOUT } from "../../store/actions/actions";

const Orders = ({ username, email, logout, history = null }) => {
  const [OrdersList, setOrdersList] = useState([]);
  useEffect(() => {
    if (CACHE.has("/orders")) {
      setOrdersList(CACHE.get("/orders"));
    } else {
      axiosInstance.get("get-user-orders").then((response) => {
        CACHE.set("/orders", response.data);
        setOrdersList(response.data);
      });
    }
  }, []);
  let orders = null;
  if (!!OrdersList.length) {
    orders = OrdersList.map((item, i) => (
      <Card2
        title={item.title}
        date={item.date}
        price={item.price}
        discount={item.discount}
        id={item.id}
        key={i}
      ></Card2>
    ));
    console.log(orders);
  }
  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section m-6"
    >
      <div className="columns is-centered">
        <div className="column is-3 ">
          <div style={{ position: "sticky", top: 90 }}>
            <div className="notification is-dark">
              <p className="is-size-4 has-text-weight-semibold">{username}</p>
              <p className="is-size-5">{email}</p>
              <Link
                to="/wishlist"
                className=" my-3 button is-primary  is-fullwidth"
              >
                <span className="icon">
                  <i className="fas fa-list-ul"></i>
                </span>
                <span>My Wishlist</span>
              </Link>
              <Link to="/editProfile" className="has-text-link">
                Edit Profile
              </Link>
            </div>
            <button
              onClick={logout}
              className="button is-primary is-outlined is-fullwidth"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="column is-6 ">
          <p>My Orders</p>
          {orders}
        </div>
      </div>
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    email: state.auth.email,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
