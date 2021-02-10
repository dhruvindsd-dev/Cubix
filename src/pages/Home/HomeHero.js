import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeImg from "../../assets/images/HomeHeroCube.png";

const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
// show the red animation only on desktop ie > 1024px, on smaller displays show staggering animation ...
const isDesktop = width > 1024;
let letterVariant,
  textVariant,
  redBackgroundVariant,
  scaleDownVariant,
  callToActionVariant,
  cubeInVariant,
  quoteVariant;
textVariant = {
  animate: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.02,
    },
  },
};
letterVariant = {
  initial: { y: isDesktop ? 300 : 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring" },
  },
};
callToActionVariant = {
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: 2.6 - (isDesktop ? 0 : 1.2) },
  },
};
cubeInVariant = {
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: 2.9 - (isDesktop ? 0 : 1.2) },
  },
};
quoteVariant = {
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: 3.1 - (isDesktop ? 0 : 1.2) },
  },
};
if (isDesktop) {
  scaleDownVariant = {
    initial: { x: 30, fontSize: "10rem", position: "absolute" },
    animate: {
      x: 0,
      fontSize: "3rem",
      position: "absolute",
      transition: { delay: 1.6, duration: 1 },
      transitionEnd: {
        position: "relative",
      },
    },
  };
  redBackgroundVariant = {
    animate: {
      opacity: 0,
      x: "100%",
      transition: { delay: 1.6, duration: 1, ease: "easeIn" },
      transitionEnd: { display: "none" },
    },
  };
}

const HomeHero = () => {
  const [CanScroll, setCanScroll] = useState(false);
  useEffect(() => {
    const html = document.querySelector("html");
    if (CanScroll) html.classList.remove("no-scroll");
    else html.classList.add("no-scroll");
  }, [CanScroll]);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="columns  m-0 is-centered"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "radial-gradient(rgba(156, 37, 37, 0.541),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0))",
      }}
      onAnimationComplete={() => {
        setCanScroll(true);
      }}
    >
      {isDesktop && (
        <motion.div
          style={{
            minHeight: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 31,
          }}
          initial={{ opacity: 1, overflowY: "hidden" }}
          variants={redBackgroundVariant}
          className="has-background-primary"
        ></motion.div>
      )}
      <div className="column is-4 section">
        <motion.p
          className=" title is-spaced has-text-white is-size-3-touch"
          style={{
            zIndex: 32,
            position: isDesktop ? "absolute" : "relative",
          }}
          variants={scaleDownVariant}
        >
          <motion.span variants={textVariant}>
            <motion.span variants={letterVariant}>B</motion.span>
            <motion.span variants={letterVariant}>e</motion.span>
            <span></span>
            <motion.span className="ml-3" variants={letterVariant}>
              A
            </motion.span>

            <motion.span className="ml-3" variants={letterVariant}>
              S
            </motion.span>
            <motion.span variants={letterVariant}>o</motion.span>
            <motion.span variants={letterVariant}>l</motion.span>
            <motion.span variants={letterVariant}>v</motion.span>
            <motion.span variants={letterVariant}>e</motion.span>
            <motion.span variants={letterVariant}>r</motion.span>

            <motion.span className="ml-3" variants={letterVariant}>
              O
            </motion.span>
            <motion.span variants={letterVariant}>f</motion.span>
            <br />
            <motion.span variants={letterVariant}>T</motion.span>
            <motion.span variants={letterVariant}>o</motion.span>
            <motion.span variants={letterVariant}>m</motion.span>
            <motion.span variants={letterVariant}>m</motion.span>
            <motion.span variants={letterVariant}>o</motion.span>
            <motion.span variants={letterVariant}>r</motion.span>
            <motion.span variants={letterVariant}>o</motion.span>
            <motion.span variants={letterVariant}>w</motion.span>
            <motion.span variants={letterVariant}>.</motion.span>
          </motion.span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          variants={callToActionVariant}
        >
          <p className="subtitle is-4-desktop  has-text-light">
            Buy Our High Quality Puzzles Today.
          </p>
          <Link to="/shop" className="button is-primary is-medium">
            Buy Now
          </Link>
        </motion.div>
      </div>
      <div className="column is-3 is-flex is-justify-content-center is-align-items-center">
        <motion.figure
          initial={{ opacity: 0, y: 100 }}
          variants={cubeInVariant}
          className="image"
        >
          <motion.img
            animate={{
              rotateZ: 360,
              // scale: [1, 1.3, 1],
              transition: { ease: "linear", duration: 10, loop: Infinity },
            }}
            src={HomeImg}
            alt="Spinning Cube"
          />
        </motion.figure>
      </div>
      <div
        className="column is-4"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <motion.div initial={{ opacity: 0, y: 100 }} variants={quoteVariant}>
          <p className="is-size-3-desktop is-size-4-touch has-text-weight-semibold popins">
            “The problems of puzzles are very near the problems of life.”
          </p>
          <p className="is-size-4-desktop is-size-5-touch">- Erno Rubik</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default HomeHero;
