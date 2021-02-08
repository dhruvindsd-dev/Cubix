import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance, CACHE } from "../../App";
import { CLEAR_CART } from "../../store/actions/actions";
import Details from "./Details";
import OrderModal from "./OrderModal";

const SideBar = (props) => {
  const [IsOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrder = () => {
    // if user is not auth then send to login page
    if (!props.isAuth)
      props.history.push("/user/auth/signup", {
        message: "Sign In To Place Your Order",
        toRedirectAfterAuth: props.location.pathname,
      });
    else
      axiosInstance.get("/place-order").then(() => {
        props.clearCart();
        // to sysnc the user with the latest orders
        CACHE.delete("/orders");
        props.history.push("/orders");
      });
  };
  return (
    <>
      {IsOrderModalOpen && (
        <OrderModal
          handleOrder={handleOrder}
          close={setIsOrderModalOpen.bind(this, false)}
        />
      )}
      <nav className="navbar is-black  is-hidden-tablet is-fixed-bottom">
        <div className="navbar-item">
          <button
            className="button is-primary is-fullwidth"
            onClick={() => {
              setIsOrderModalOpen(true);
            }}
          >
            Place Order
          </button>
        </div>
      </nav>
      <div className="notification is-dark my-3">
        <p className="mb-2 ">Have A Coupon ? </p>
        <input type="text" className="input" />
        <button className="button is-primary is-outlined is-fullwidth mt-3">
          Check Coupon
        </button>
      </div>
      <Details />
      <button
        onClick={() => {
          setIsOrderModalOpen(true);
        }}
        className="button is-primary is-fullwidth mt-2 is-hidden-touch"
      >
        Place Order
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {
      dispatch({ type: CLEAR_CART, payload: {} });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
