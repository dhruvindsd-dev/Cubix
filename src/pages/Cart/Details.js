import React from "react";
import { connect } from "react-redux";

const Details = (props) => {
  const { cart } = props;
  let billingDetails;
  let total = 0;
  if (cart.length > 0)
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

  return (
    <>
      <p className="l-opacity mb-2">Billing Details</p>
      <div className="notification is-dark">
        {billingDetails}
        <div className="columns is-mobile has-text-light">
          {!!total ? (
            <>
              <div className="column">Total</div>
              <div className="column has-text-right">₹{total}</div>{" "}
            </>
          ) : (
            <p className="l-opacity m-3">No Items In The Cart</p>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};
export default connect(mapStateToProps)(Details);
