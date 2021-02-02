import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { axiosInstance, ROUTER_VARIANTS } from "../../App";
import Loader from "../../components/Loader/Loader";
import Card1 from "../../components/ProductCard/Card1/Card1";

const Search = (props) => {
  const [State, setState] = useState({
    isLoading: false,
    data: [],
  });
  const searchParams = new URLSearchParams(props.location.search).get("search");
  useEffect(() => {
    //   get query params to backend and get response and show it
    setState({
      ...State,
      isLoading: true,
    });
    axiosInstance
      .get("product-search", { params: { search: searchParams } })
      .then((response) => {
        setState({
          isLoading: false,
          data: response.data.products,
        });
      });
  }, [searchParams]);
  let results;
  if (State.isLoading) results = <Loader />;
  else if (State.data.length === 0)
    results = (
      <p className="is-size-5-desktop has-text-primary l-opacity">
        No results <br />
        Try Seaching Something Else
      </p>
    );
  else
    results = (
      <div className="columns is-multiline">
        {State.data.map((item, i) => (
          <div className=" column is-3">
            <Card1 smallCardObj={item} key={i} />
          </div>
        ))}
      </div>
    );

  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section"
    >
      <p className="is-size-3 has-text-weight-semibold is-size-4-mobile mb-4">
        Showing Results for{" "}
        <span className="has-text-primary">"{searchParams}"</span>
      </p>
      {results}
    </motion.div>
  );
};
export default withRouter(Search);
