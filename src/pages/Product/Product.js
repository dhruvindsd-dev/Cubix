import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance, ROUTER_VARIANTS } from "../../App";
import cube from "../../assets/images/HomeHeroCube.png";

import Loader from "../../components/Loader/Loader";
import ProductMoreDetails from "./ProductMoreDetails/ProductMoreDetails";
import ProductPageMainContent from "./ProductPageMainContent/ProductPageMainContent";

const Product = (props) => {
  const [State, setState] = useState({
    isLoading: true,
    data: null,
  });
  useEffect(() => {
    axiosInstance
      .get(`get-product-data/${props.match.params.id}`)
      .then((response) => {
        setState({
          isLoading: false,
          data: response.data,
        });
      })
      .catch((error) => {});
  }, []);
  if (State.isLoading) return <Loader />;
  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="section has-text-light">
        <div className="columns">
          <div className="column is-4">
            <figure
              className="image is-relative"
              style={{
                backgroundImage:
                  "radial-gradient(rgb(255, 0, 0), rgba(255, 0, 0, 0.445), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
              }}
            >
              <motion.img
                src={State.data.img}
                className="is-overlay"
                style={{ objectFit: "contain" }}
              />
            </figure>
          </div>
          <div className="column is-5">
            <ProductPageMainContent
              isAuth={props.isAuthenticated}
              ProductData={State.data}
            />
          </div>
          <div className="column is-3">
            <ProductMoreDetails
              isAuth={props.isAuthenticated}
              ProductData={State.data}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withRouter(Product));
