import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="footer has-background-dark has-text-centered"
      style={{ position: "sticky", bottom: 0 }}
    >
      <div className="buttons is-centered">
        {/* github, instagram, linkin, bulma  */}
        <Link className="button is-black">
          <span className="icon is-size-5 is-medium">
            <i className="fab fa-github"></i>
          </span>
        </Link>
        <Link className="button is-black">
          <span className="icon is-size-5 is-medium">
            <i className="fab fa-linkedin"></i>
          </span>
        </Link>
        <Link className="button is-black">
          <span className="icon is-size-5 is-medium">
            <i className="fab fa-instagram"></i>
          </span>
        </Link>
      </div>
      <p>Designed & Built by Dhruvin Deshpande </p>
      <br />
      <p>Contact me </p>
      <a href="">dhruvinddev@gmail.com</a>
    </div>
  );
};

export default Footer;
