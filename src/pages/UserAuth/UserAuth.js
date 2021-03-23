import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { ROUTER_VARIANTS } from "../../App";
import Logo from "../../components/Logo/Logo";
import HooksForm from "./InputList/HooksForm";

const UserAuth = (props) => {
  const [IsSignUp, setIsSignUp] = useState(false);
  useEffect(() => {
    if (props.match.params.type === "signin" && IsSignUp !== false)
      setIsSignUp(false);
    else if (props.match.params.type === "signup" && IsSignUp !== true)
      setIsSignUp(true);
    else {
      //   redirect to 404
    }
  }, [props.match.params.type]);
  // if the user does any action which can only be done when the user is authenticated then redirect to the same page he came from and display a custome message
  const routeState = props.location.state;
  let message;
  if (routeState) {
    message = routeState.message;
  } else {
    message = (
      <>
        {IsSignUp ? "SignUp" : "Signin"} with <Logo />
      </>
    );
  }
  // using a septate function to achieve routing changes since we have to redirect the user to same page he was comming from. this method the will pass the location routes state from when the user is switching from sign to signup
  const handleRouting = (to) => {
    let toPassState = {};
    if (routeState) toPassState = routeState;
    props.history.push(to, toPassState);
  };
  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section columns is-centered"
    >
      <div className="column is-5">
        <div className="box  has-text-centered">
          <p className="p-3 is-size-4">{message}</p>
          <div className="buttons is-centered">
            <button
              onClick={handleRouting.bind(this, "./signin")}
              className={"button is-primary " + (!IsSignUp ? "" : "is-light")}
            >
              Login
            </button>
            <button
              onClick={handleRouting.bind(this, "./signup")}
              className={"button is-primary  " + (IsSignUp ? "" : "is-light")}
            >
              Register
            </button>
          </div>
          <div className="box has-background-light">
            <div className="buttons is-centered">
              <button className="button is-light is-link is-outlined     ">
                <span className="icon">
                  <FaGoogle />
                </span>
                <span>Google</span>
              </button>
              <button className="button is-light is-link is-outlined     ">
                <span className="icon">
                  <FaFacebookSquare />
                </span>
                <span>FaceBook</span>
              </button>
            </div>
            <p className="my-3 has-text-weight-bold"> - OR - </p>
            <HooksForm isSignUp={IsSignUp} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default withRouter(UserAuth);
