import React from "react";
import whatCube from "../../assets/images/homeBanner.jpg";
import { motion } from "framer-motion";
import { ROUTER_VARIANTS } from "../../App";
import { Link } from "react-router-dom";
import HomeHero from "./HomeHero";

const Home = () => {
  return (
    <motion.div
      variants={ROUTER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HomeHero />
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
        <div className="columns is-centered">
          <div className="column is-8">
            <p className="title has-text-light">Benefits of the CUBE. </p>
            <div className="mt-6">
              <div className="columns is-multiline">
                <div className="column is-4">
                  <div className="box has-background-dark has-text-light">
                    <p className="subtitle has-text-light">some title</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, ut deleniti. Quis corrupti nobis deleniti,
                      eveniet reprehenderit cupiditate aut, ipsa adipisci rem
                      sequi mollitia libero minima maiores tempora, culpa at.
                    </p>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="box has-background-dark has-text-light">
                    <p className="subtitle has-text-light">some title</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, ut deleniti. Quis corrupti nobis deleniti,
                      eveniet reprehenderit cupiditate aut, ipsa adipisci rem
                      sequi mollitia libero minima maiores tempora, culpa at.
                    </p>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="box has-background-dark has-text-light">
                    <p className="subtitle has-text-light">some title</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, ut deleniti. Quis corrupti nobis deleniti,
                      eveniet reprehenderit cupiditate aut, ipsa adipisci rem
                      sequi mollitia libero minima maiores tempora, culpa at.
                    </p>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="box has-background-dark has-text-light">
                    <p className="subtitle has-text-light">some title</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, ut deleniti. Quis corrupti nobis deleniti,
                      eveniet reprehenderit cupiditate aut, ipsa adipisci rem
                      sequi mollitia libero minima maiores tempora, culpa at.
                    </p>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="box has-background-dark has-text-light">
                    <p className="subtitle has-text-light">some title</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, ut deleniti. Quis corrupti nobis deleniti,
                      eveniet reprehenderit cupiditate aut, ipsa adipisci rem
                      sequi mollitia libero minima maiores tempora, culpa at.
                    </p>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="box has-background-dark has-text-light">
                    <p className="subtitle has-text-light">some title</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, ut deleniti. Quis corrupti nobis deleniti,
                      eveniet reprehenderit cupiditate aut, ipsa adipisci rem
                      sequi mollitia libero minima maiores tempora, culpa at.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <Link to="/shop" className="button is-primary is-fullwidth">
              GET YOUR CUBE TODAY
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default Home;
