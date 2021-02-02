import { axiosInstance } from "../../App";
import * as actionTypes from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  authToken: "",
  username: "",
  email: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN:
      // storing things in the local storage for auto login
      axiosInstance.interceptors.request.use((req) => {
        req.headers.Authorization = `Token ${payload.token}`;
        return req;
      });
      localStorage.setItem("username", payload.username);
      localStorage.setItem("authToken", payload.token);
      localStorage.setItem("email", payload.email);

      return {
        ...state,
        isAuthenticated: true,
        authToken: payload.token,
        username: payload.username,
        email: payload.email,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("username");
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      return { ...state, isAuthenticated: false, authToken: "", username: "" };
    default:
      return state;
  }
};
