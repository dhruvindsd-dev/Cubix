import { useEffect, useState } from "react";
import { axiosInstance, CACHE } from "../App";
// caching with react-router match params and not the api-url since the api-url can be long and hard to delete at differnt places.
const useFetchWithCache = (url, cachePath) => {
  // const [data, setdata] = useState(null);
  // const [loading, setloading] = useState(true);
  const [State, setState] = useState({
    isLoading: true,
    data: null,
  });
  const setData = (data) => {
    CACHE.set(cachePath, data);
    setState({
      ...State,
      data: data,
    });
  };
  useEffect(() => {
    if (CACHE.has(cachePath))
      setState({
        isLoading: false,
        data: CACHE.get(cachePath),
      });
    else
      axiosInstance.get(url).then((res) => {
        CACHE.set(cachePath, res.data);
        setState({
          isLoading: false,
          data: res.data,
        });
      });
  }, []);
  return [State.data, State.isLoading, setData];
};

export default useFetchWithCache;
