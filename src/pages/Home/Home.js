import React, { useEffect, useRef, useState } from "react";
import HomeImg from "../../assets/images/HomeHeroCube.png";
import whatCube from "../../assets/images/cube1.jpg";

import { motion } from "framer-motion";
import { routesVariants } from "../../App";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      variants={routesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HomeHero />
      <GeneralContent />
    </motion.div>
  );
};
const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
console.log(width);
let letterVariant, textVariant;
if (width > 768) {
  textVariant = {
    initial: {},
    animate: { transition: { delayChildren: 0.5, staggerChildren: 0.02 } },
  };
  letterVariant = {
    initial: { y: 300, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring" },
    },
  };
} else {
  textVariant = {};
  letterVariant = {};
}

const HomeHero = () => {
  const isAnimationDone = useRef(false);
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        className="columns  m-0  is-centered"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "radial-gradient(rgba(156, 37, 37, 0.541),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0))",
        }}
      >
        <motion.div
          style={{
            minHeight: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 31,
          }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            x: "100%",
            transition: { delay: 1.6, duration: 1, ease: "easeIn" },
            transitionEnd: { display: "none" },
          }}
          className="has-background-primary"
        ></motion.div>
        <div className="column is-4">
          <motion.p
            className=" has-text-weight-bold has-text-white"
            style={{ zIndex: 32, position: "absolute" }}
            variants={textVariant}
            initial={{ x: 30, fontSize: "10rem", position: "absolute" }}
            animate={{
              x: 0,
              fontSize: "3rem",
              position: "absolute",
              transition: { delay: 1.6, duration: 1 },
              transitionEnd: {
                position: "relative",
              },
            }}
          >
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
          </motion.p>
          <br />
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 2.6 } }}
            className="is-size-4 has-text-light"
          >
            Buy Our High Quality Puzzels Today.
            <Link to="/shop" className="button is-primary is-large mt-4">
              Buy Now
            </Link>
          </motion.p>
        </div>
        <div
          className="column is-3"
          style={{ display: "flex", alignItems: "center" }}
        >
          <motion.figure
            initial={{ opacity: 0, y: 100 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 2.9 } }}
            className="image"
          >
            <motion.img
              animate={{
                rotateZ: 360,
                scale: [1, 1.3, 1],
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
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 3.1 } }}
          >
            <p className="is-size-2 has-text-weight-semibold popins">
              “The problems of puzzles are very near the problemsof life.”
            </p>
            <p className="is-size-4">- Erno Rubik</p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
const GeneralContent = () => (
  <>
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-4">
          <p className="title has-text-light">What is a CUBE ?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            voluptates, impedit laborum maxime voluptatibus dolorum esse modi
            inventore expedita amet, quibusdam recusandae sed consequatur quod
            ex incidunt molestiae, voluptate cum?
          </p>
        </div>
        <div className="column is-4">
          <figure className="figure is-4x3">
            <img src={whatCube} alt="" />
          </figure>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-8">
          <p className="title has-text-light">Bennifits OF THE CUBE. </p>
          <div className="mt-6">
            <div className="columns is-multiline">
              <div className="column is-4">
                <div className="box has-background-dark has-text-light">
                  <p className="subtitle has-text-light">some title</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, ut deleniti. Quis corrupti nobis deleniti, eveniet
                    reprehenderit cupiditate aut, ipsa adipisci rem sequi
                    mollitia libero minima maiores tempora, culpa at.
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-dark has-text-light">
                  <p className="subtitle has-text-light">some title</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, ut deleniti. Quis corrupti nobis deleniti, eveniet
                    reprehenderit cupiditate aut, ipsa adipisci rem sequi
                    mollitia libero minima maiores tempora, culpa at.
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-dark has-text-light">
                  <p className="subtitle has-text-light">some title</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, ut deleniti. Quis corrupti nobis deleniti, eveniet
                    reprehenderit cupiditate aut, ipsa adipisci rem sequi
                    mollitia libero minima maiores tempora, culpa at.
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-dark has-text-light">
                  <p className="subtitle has-text-light">some title</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, ut deleniti. Quis corrupti nobis deleniti, eveniet
                    reprehenderit cupiditate aut, ipsa adipisci rem sequi
                    mollitia libero minima maiores tempora, culpa at.
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-dark has-text-light">
                  <p className="subtitle has-text-light">some title</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, ut deleniti. Quis corrupti nobis deleniti, eveniet
                    reprehenderit cupiditate aut, ipsa adipisci rem sequi
                    mollitia libero minima maiores tempora, culpa at.
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-dark has-text-light">
                  <p className="subtitle has-text-light">some title</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, ut deleniti. Quis corrupti nobis deleniti, eveniet
                    reprehenderit cupiditate aut, ipsa adipisci rem sequi
                    mollitia libero minima maiores tempora, culpa at.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section has-text-centered">
      <Link to="/shop" className="button is-primary is-large">
        CLICK HERE TO GET YOUR CUBE TODAY
      </Link>
    </section>
  </>
);
export default Home;
