import React, { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router";
import "./assets/css/bulma/bulma.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Axios from "axios";
import Footer from "./components/Footer/Footer";
import { connect } from "react-redux";
import { LOGIN } from "./store/actions/actions";
import Loader from "./components/Loader/Loader";
import { AnimatePresence } from "framer-motion";

// CONVENTION TO FOLLOW for one time use components : - dump ones => same file different function wiht memo maybe
// smert ones =>same folder different file

// small bug : when the user logs in for the firsttime the headers are not added, since the instance has aldready been initilized, adding the logic to the inter ceptor will solve it

export const axiosInstance = Axios.create({
  // http://127.0.0.1:8000
  // https://cubix.pythonanywhere.com
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});

export const CACHE = new Map();

// lazy loading
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Product = lazy(() => import("./pages/Product/Product"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Search = lazy(() => import("./pages/Search/Search"));
const UserAuth = lazy(() => import("./pages/UserAuth/UserAuth"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const WishList = lazy(() => import("./pages/WishList/WishList"));

export const ROUTER_VARIANTS = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.1 } },
};

export const Card2StaggerParent = {
  animate: {
    transition: {
      // delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};
export const Card2StaggerChild = {
  initial: { x: -30, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
  },
};
function App(props) {
  const location = useLocation();
  // auto login
  // can do in redux directly but in the future i want to log the user in and then check his validation token and while doing that show a loader
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");
  const email = localStorage.getItem("email");
  if (username && authToken && email) {
    props.login(username, authToken, email);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* sticy footer using flexbox */}
      <div style={{ flex: "1 0 auto" }}>
        <Navbar />
        <AnimatePresence initial={true} exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route
              path="/"
              exact
              render={() => (
                <Suspense
                  fallback={
                    <div
                      style={{
                        minHeight: "100vh",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 31,
                      }}
                      className="has-background-black"
                    ></div>
                  }
                >
                  <Home />
                </Suspense>
              )}
            />
            <Route
              path="/shop"
              exact
              render={() => (
                <Suspense fallback={<Loader />}>
                  <Shop />
                </Suspense>
              )}
            />
            <Route
              path="/user/auth/:type"
              render={() => (
                <Suspense fallback={<Loader />}>
                  <UserAuth />
                </Suspense>
              )}
            />
            <Route
              path="/orders"
              render={() => (
                <Suspense fallback={<Loader />}>
                  {/* // @ts-ignore */}
                  <Orders />
                </Suspense>
              )}
            />
            <Route
              path="/product/:id"
              render={() => (
                <Suspense fallback={<Loader />}>
                  <Product />
                </Suspense>
              )}
            />
            <Route
              path="/cart"
              render={() => (
                <Suspense fallback={<Loader />}>
                  <Cart />
                </Suspense>
              )}
            />
            <Route
              path="/search"
              render={() => (
                <Suspense fallback={<Loader />}>
                  <Search />
                </Suspense>
              )}
            />
            <Route
              path="/wishlist"
              render={() => (
                <Suspense fallback={<Loader />}>
                  <WishList />
                </Suspense>
              )}
            />
          </Switch>
        </AnimatePresence>
      </div>
      <div style={{ flexShrink: 0 }}>
        <Footer />
      </div>
    </div>
  );
}

// authtoken verification ... after state wheneve the user makes a request and the token is invalid then show a popup and make sure to log him out .

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, token, email) => {
      dispatch({
        type: LOGIN,
        payload: {
          username: username,
          token: token,
          email: email,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
