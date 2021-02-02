import { useState, useEffect } from "react";
import { axiosInstance, CACHE } from "../../../App";

import React from "react";
import BennifitContent from "../../../layouts/BennifitContent/BennifitContent";
import Loader from "../../../components/Loader/Loader";

const BennifitContentList = () => {
  const [State, setState] = useState({
    IsLoading: true,
    data: null,
  });
  // const [IsLoading, setIsLoading] = useState(true);
  // const [benifitData, setbenifitData] = useState(null);
  useEffect(() => {
    if (CACHE.has("/bennifitContent")) {
      setState({
        IsLoading: false,
        data: CACHE.get("/bennifitContent"),
      });
    } else {
      axiosInstance
        .get("/home-page")
        .then((response) => {
          setState({
            IsLoading: false,
            data: response.data,
          });
          CACHE.set("/bennifitContent", response.data);
        })
        .catch((error) => {});
    }
  }, []);
  let bennifitContent;
  if (State.IsLoading) bennifitContent = <Loader />;
  else
    bennifitContent = Object.keys(State.data).map((item, i) => (
      <BennifitContent key={i} title={item} cards={State.data[item]} />
    ));

  return <> {bennifitContent}</>;
};

export default BennifitContentList;
