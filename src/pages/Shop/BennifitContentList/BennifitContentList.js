import { useState, useEffect } from "react";
import { axiosInstance, CACHE } from "../../../App";

import React from "react";
import BennifitContent from "../../../layouts/BennifitContent/BennifitContent";
import Loader from "../../../components/Loader/Loader";

const BennifitContentList = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [benifitData, setbenifitData] = useState(null);
  useEffect(() => {
    if (CACHE.has("/")) {
      setbenifitData(CACHE.get("/"));
      setIsLoading(false);
    } else {
      axiosInstance
        .get("/home-page")
        .then((response) => {
          setbenifitData(response.data);
          CACHE.set("/", response.data);
          setIsLoading(false);
        })
        .catch((error) => {});
    }
  }, []);
  let bennifitContent;
  if (IsLoading) {
    bennifitContent = <Loader />;
  } else {
    bennifitContent = Object.keys(benifitData).map((item, i) => (
      <BennifitContent key={i} title={item} cards={benifitData[item]} />
    ));
  }
  return <React.Fragment> {bennifitContent}</React.Fragment>;
};

export default BennifitContentList;
