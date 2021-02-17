import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { axiosInstance, ROUTER_VARIANTS } from "../../App";

import Loader from "../../components/Loader/Loader";
import BennifitContent from "../../layouts/BennifitContent/BennifitContent";
import ProductMoreDetails from "./ProductMoreDetails/ProductMoreDetails";
import ProductPageMainContent from "./ProductPageMainContent/ProductPageMainContent";

const Product = ({ match, isAuthenticated }) => {
  const [State, setState] = useState({
    isLoading: true,
    data: null,
  });
  useEffect(() => {
    axiosInstance
      .get(`get-product-data/${match.params.id}`)
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
              className="image"
              style={{
                backgroundImage:
                  "radial-gradient(rgb(255, 0, 0), rgba(255, 0, 0, 0.445), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
              }}
            >
              <img
                src={State.data.product.img}
                style={{ objectFit: "contain" }}
              />
            </figure>
          </div>
          <div className="column is-5">
            <ProductPageMainContent
              isAuth={isAuthenticated}
              ProductData={State.data.product}
            />
          </div>
          <div className="column is-3">
            <ProductMoreDetails
              isAuth={isAuthenticated}
              ProductData={State.data.product}
            />
          </div>
        </div>
        <BennifitContent
          title="Similar Products"
          cards={State.data.recomendation}
        />
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
