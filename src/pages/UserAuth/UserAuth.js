import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { ROUTER_VARIANTS } from "../../App";
import Logo from "../../components/Logo/Logo";
import InputList from "./InputList/InputList";

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
          <p className="p-3 is-size-4">
            {IsSignUp ? "Sign-Up" : "Login"} with <Logo />
          </p>
          <div className="buttons is-centered">
            <Link
              to="/user/auth/signin"
              className={"button is-primary  " + (!IsSignUp ? "" : "is-light")}
            >
              Login
            </Link>
            <Link
              to="/user/auth/signup"
              className={"button is-primary  " + (IsSignUp ? "" : "is-light")}
            >
              Register
            </Link>
          </div>
          <div className="box has-background-light">
            <div className="buttons is-centered">
              <button className="button is-light is-link is-outlined     ">
                <span className="icon">
                  <i className="fab fa-google"></i>
                </span>
                <span>Google</span>
              </button>
              <button className="button is-light is-link is-outlined     ">
                <span className="icon">
                  <i className="fab fa-facebook-square"></i>
                </span>
                <span>FaceBook</span>
              </button>
            </div>
            <p className="my-3 has-text-weight-bold"> - OR - </p>
            <InputList isSignUp={IsSignUp} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default withRouter(UserAuth);
