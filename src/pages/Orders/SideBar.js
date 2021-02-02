import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../store/actions/actions";

const SideBar = ({ username, email, logout }) => {
  console.log("imm being rendered");
  return (
    <div className="column is-3">
      <div style={{ position: "sticky", top: 90 }}>
        <div className="notification is-dark">
          <p className="is-size-4 has-text-weight-semibold">{username}</p>
          <p className="is-size-5">{email}</p>
          <Link
            to="/wishlist"
            className=" my-3 button is-primary  is-fullwidth"
          >
            <span className="icon">
              <i className="fas fa-list-ul"></i>
            </span>
            <span>My Wishlist</span>
          </Link>
          <Link to="/editProfile" className="has-text-link">
            Edit Profile
          </Link>
        </div>
        <button
          onClick={logout}
          className="button is-primary is-outlined is-fullwidth"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    email: state.auth.email,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
