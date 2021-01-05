import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./navbar.css";
const Navbar = (props) => {
  console.log(props);
  const [isSpaced, setisSpaced] = useState(true);
  const [IsActive, setIsActive] = useState(false);
  const searchText = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      if (window.scrollY > 50) {
        setisSpaced(false);
      } else {
        setisSpaced(true);
      }
    });
  });
  if (props.location.pathname == "/") {
    return null;
  }
  return (
    <nav
      className={
        "navbar is-black is-fixed-top " + (isSpaced ? "is-spaced" : "")
      }
      style={{
        background: isSpaced ? "transparent" : "#2c2c2c5e",
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
      }}
    >
      <div className="navbar-brand">
        <Link
          to="/shop"
          className="navbar-item has-text-primary is-size-4 has-text-weight-bold"
        >
          <Logo />
        </Link>
        <div
          className={"navbar-burger " + (IsActive ? "is-active" : "")}
          onClick={setIsActive.bind(this, !IsActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={"navbar-menu" + (IsActive ? "is-active" : "")}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field has-addons">
              <div className="control has-icons-left">
                <input ref={searchText} type="text" className="input" />
                <span className="icon is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={() => {
                    props.history.push(
                      `/search?search=${searchText.current.value}`
                    );
                    searchText.current.value = "";
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <NavLink
            activeClassName="is-active is-tab"
            to={props.authState ? "/orders" : "/user/auth/signup"}
            className="navbar-item"
          >
            <span className="icon has-text-light is-large is-size-4">
              <i className="fas fa-user" />
            </span>
          </NavLink>
          <NavLink
            activeClassName="is-active is-tab"
            to="/cart"
            className="navbar-item cart"
          >
            <span className="icon has-text-light is-large is-size-4 has-text-weight-bold">
              <i className="fas fa-shopping-cart">
                <span className="cart-counter">{props.cart.length}</span>
              </i>
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    authState: state.auth.isAuthenticated,
    cart: state.cart.cart,
  };
};
export default withRouter(connect(mapStateToProps)(Navbar));
