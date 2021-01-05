import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../App";
import { ADD_ITEM } from "../../../store/actions/actions";

const ProductPageMainContent = ({
  ProductData,
  addCartItem,
  isAuth,
  history,
  match,
  location,
}) => {
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const handleAddCart = () => {
    // 1. user is not auth : addredux and redirect to cart ,
    // 2. user is auth : addredux,loading , and after loading redirect to cart
    addCartItem({
      id: ProductData.id,
      title: ProductData.title,
      avalibility: ProductData.avalibility,
      price: ProductData.price,
      discount: ProductData.discount,
    });
    if (isAuth) {
      // save to backend server
      setIsBtnLoading(true);
      axiosInstance.put(`cart/add/${ProductData.id}`).then((response) => {
        history.push("/cart");
      });
    } else {
      history.push("/cart");
    }
  };
  return (
    <div className="section">
      <p>
        <span className="is-size-2 has-text-weight-bold">
          {ProductData.title}
        </span>
        <br />
        <span className="is-size-7">
          <span className="l-opacity has-text-light mr-1">Rating :</span>
          {Array(ProductData.rating)
            .fill(1)
            .map((item, i) => (
              <i key={i} className="fas fa-star has-text-warning"></i>
            ))}
        </span>
        <br />
      </p>
      <p className="is-size-4">
        <span className="is-size-7" style={{ textDecoration: "line-through" }}>
          Mrp : ₹{ProductData.price}
        </span>
        <br />
        <span className="is-size-6 l-opacity">Price : </span>
        <span className="mr-1">₹</span>
        {Math.floor(
          ProductData.price - (ProductData.price * ProductData.discount) / 100
        )}
      </p>
      <br />
      <br />
      <p className="is-size-7 l-opacity">Product Description :</p>
      <p className="content">{ProductData.description}</p>
      <hr />
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
          <span className=" has-text-primary">
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
        <span className="icon is-size-7">
          <i className="fas fa-shopping-cart" />
        </span>
        <span>Add To Cart</span>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {};
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
