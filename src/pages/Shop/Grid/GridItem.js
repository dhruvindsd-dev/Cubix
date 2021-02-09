import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const zoomVariants = {
  hover: {
    rotate: 10,
    scale: 1.3,
  },
};

const GridItem = ({ img, title, linkName, figClass = "is-square" }) => {
  return (
    <motion.div className="column" whileHover="hover">
      <div className="is-relative is-clipped">
        <Link
          to={`/search/?search=&catagory=${linkName}`}
          className="figure-black-gradient is-absolute"
        ></Link>
        <div className="is-absolute is-size-4 has-text-weight-bold m-3  has-text-white">
          {title}
        </div>
        <motion.figure
          variants={zoomVariants}
          className={"image  bg-img " + figClass}
          style={{ backgroundImage: `url(${img})` }}
        ></motion.figure>
      </div>
    </motion.div>
  );
};

export default GridItem;
