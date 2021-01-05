import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance, routesVariants } from "../../App";
import cube from "../../assets/images/HomeHeroCube.png";

import Loader from "../../components/Loader/Loader";
import { ADD_ITEM } from "../../store/actions/actions";
import ProductMoreDetails from "./ProductMoreDetails/ProductMoreDetails";
import ProductPageMainContent from "./ProductPageMainContent/ProductPageMainContent";

const Product = (props) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [ProductData, setProductData] = useState(null);

  useEffect(() => {
    // get data from backendq
    axiosInstance
      .get(`get-product-data/${props.match.params.id}`)
      .then((response) => {
        setProductData(response.data.product);
        setIsLoading(false);
      })
      .catch((error) => {});
  }, []);

  let page;
  if (IsLoading) {
    page = (
      <div
        className="section"
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  } else {
    page = (
      <div className="section has-text-light">
        <div className="columns">
          <div className="column is-5">
            <figure
              className="image is-relative"
              style={{
                backgroundImage:
                  "radial-gradient(rgb(255, 0, 0), rgba(255, 0, 0, 0.445), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
              }}
            >
              <img src={cube} alt="" style={{ objectFit: "contain" }} />

              <motion.img
                src={cube}
                alt=""
                className="is-overlay"
                style={{ objectFit: "contain" }}
              />
            </figure>
          </div>
          <div className="column is-4">
            <ProductPageMainContent
              isAuth={props.isAuthenticated}
              ProductData={ProductData}
            />
          </div>
          <div className="column is-3">
            <ProductMoreDetails
              isAuth={props.isAuthenticated}
              ProductData={ProductData}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {page}
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withRouter(Product));
