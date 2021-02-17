import React, { useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../App";
import Rating from "../../../components/Rating/Rating";
import { getPriceFromDiscount } from "../../../shared";
import { ADD_ITEM } from "../../../store/actions/actions";

const ProductPageMainContent = (props) => {
  const { ProductData, addCartItem, isAuth, history } = props;
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const handleAddCart = () => {
    // 1. user is not auth : addredux and redirect to cart ,
    // 2. user is auth : addredux, send data to backend and AFTER YOU GET THE RESPONSE REDIRECT TO CART
    addCartItem({
      ...ProductData,
    });
    if (isAuth) {
      setIsBtnLoading(true);
      axiosInstance.put(`cart/add/${ProductData.id}`).then(() => {
        history.push("/cart");
      });
    } else history.push("/cart");
  };
  return (
    <div className="no-mobile-section pb-0">
      <p>
        <span className="is-size-3 has-text-weight-bold">
          {ProductData.title}
        </span>
        <br />
        <Rating num={ProductData.rating} />
      </p>
      <p className="is-size-4">
        <span className="is-size-7" style={{ textDecoration: "line-through" }}>
          Mrp : ₹{ProductData.price}
        </span>
        <br />
        <span className="is-size-6 l-opacity">Price : </span>
        <span className="ml-2">₹</span>
        {getPriceFromDiscount(ProductData.price, ProductData.discount)}
      </p>
      <br />
      <br />
      <p className="is-size-7 l-opacity">Product Description :</p>
      <p className="content">{ProductData.description}</p>
      <hr className="l-opacity" />
      <p className="is-size-7">
        <span className="has-text-light l-opacity">
          <span className="mr-2">Availability :</span>
        </span>
        {ProductData.avalibility ? (
          "In stock"
        ) : (
          <span className="has-text-primary">Out Of Stock</span>
        )}
      </p>
      <p className="is-size-7 mt-3">
        {ProductData.no_contact_delivery ? (
          <span className=" has-text-success">
            No Contact Delivery AvailAble
          </span>
        ) : (
          <span className="has-text-primary">
            No Contact Delivery Not AvailAble
          </span>
        )}
      </p>
      <br />

      <button
        className={
          "button is-medium is-primary " + (IsBtnLoading ? "is-loading" : "")
        }
        onClick={handleAddCart}
      >
        <span className="icon ">
          <RiShoppingCart2Line />
        </span>
        <span>Add To Cart</span>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (cartObj) => {
      dispatch({ type: ADD_ITEM, payload: { cartObj: cartObj } });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductPageMainContent));
