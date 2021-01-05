import React from "react";

const Grid = () => {
  return (
    <section className="section">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child">
            <figure className="image is-4by3">
              <img src="home-hero.jpg" alt="" />
              <div className="title is-relative">Test</div>
            </figure>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child notification is-warning" />
        </div>
        <div className="tile is-parent">
          <div className="tile is-child notification is-wa rning" />
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          <div className="tile is-child notification is-danger" />
          <div className="tile is-child notification is-danger" />
        </div>
        <div className="tile is-parent">
          <div className="tile is-child notification is-danger" />
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-6">
          <div className="tile is-child notification is-link" />
        </div>
        <div className="tile is-6 is-flex-touch">
          <div className="tile is-parent">
            <div className="tile is-child notification is-link" />
          </div>
          <div className="tile is-parent">
            <div className="tile is-child notification is-link" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
