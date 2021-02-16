import React, { useState } from "react";
import { GrFormCheckmark, GrList } from "react-icons/gr";
import { Redirect, useHistory, useLocation } from "react-router";
import { axiosInstance, CACHE } from "../../../App";

const ProductMoreDetails = ({ ProductData, isAuth }) => {
  // const [IsBtnLoading, setIsBtnLoading] = useState(false);
  // const [IsAdded, setIsAdded] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [State, setState] = useState({
    isBtnLoading: false,
    isAdded: false,
  });
  const handleWishList = () => {
    // save to backend server
    if (isAuth) {
      setState({
        ...State,
        isBtnLoading: true,
      });
      axiosInstance.put(`wishList/add/${ProductData.id}`).then(() => {
        setState({
          isBtnLoading: false,
          isAdded: true,
        });
        CACHE.delete("/wishlist");
      });
    } else {
      // redirect to the product page against afte signing in
      history.push("/user/auth/signin", {
        message: "Sign in to add item to wishlist ",
        toRedirectAfterAuth: location.pathname,
      });
    }
  };

  return (
    <div className="no-mobile-section ">
      <p className="is-size-5">
        <span>Specifications</span>
      </p>
      <br />
      <p className="is-size-6">
        <span className="l-opacity mr-1">Weight: </span>
        {ProductData.weight} grams
      </p>
      <p className="is-size-6">
        <span className="l-opacity mr-1">Color : </span>
        {ProductData.color}
      </p>
      <p className="is-size-6 my-2">
        {ProductData.returnable ? (
          <span className="has-text-success">Product Returnable In 2 days</span>
        ) : (
          <span className="has-text-primary">Product Not Returnable</span>
        )}
      </p>
      <button
        onClick={handleWishList}
        className={
          "my-3 button is-fullwidth is-outlined" +
          (State.isBtnLoading ? " is-loading" : " ") +
          (State.isAdded ? " is-success is-static" : " is-primary ")
        }
      >
        <span className="icon">
          {State.isAdded ? (
            <GrFormCheckmark size={100} fill="green" />
          ) : (
            <GrList />
          )}
        </span>
        <span>
          {State.isAdded ? "Item Added To Wishlist" : "Add Item To Wishlist"}
        </span>
      </button>
      <br />
      <p className="is-size-5">
        <strong className="l-opacity has-text-light">Reviews</strong>
      </p>
      <ul style={{ listStyleType: "disc", listStylePosition: "inside" }}>
        <li>review1</li>
        <li>review2</li>
        <li>review3</li>
      </ul>
    </div>
  );
};

export default ProductMoreDetails;
