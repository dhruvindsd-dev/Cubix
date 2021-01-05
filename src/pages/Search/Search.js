import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { axiosInstance, routesVariants } from "../../App";
import Card1 from "../../components/ProductCard/Card1/Card1";

const Search = (props) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const searchParams = new URLSearchParams(props.location.search).get("search");
  useEffect(() => {
    //   get query params to backend and get response and show it
    axiosInstance
      .get("product-search", { params: { search: searchParams } })
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);
  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section"
    >
      <p className="is-size-3 has-text-weight-semibold mb-4">
        Showing Results for "{searchParams}"
      </p>
      <div className="columns section is-multiline">
        {!!Products.length ? (
          Products.map((item, i) => (
            <div className=" column is-3">
              <Card1 smallCardObj={item} key={i} />
            </div>
          ))
        ) : (
          <p className="is-size-5 has-text-primary">
            No results <br />
            Try Seaching Something Else{" "}
          </p>
        )}
      </div>
    </motion.div>
  );
};
export default withRouter(Search);
