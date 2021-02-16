import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Test = () => {
  const [State, setState] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const handleClick = (num) => {
    let updateState = [...State];
    updateState = updateState.filter((item) => item !== num);
    setState(updateState);
  };
  const arr = (
    <AnimatePresence>
      {State.map((item, i) => (
        <motion.div
          key={item}
          animate={{ opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
        >
          <Notification
            title={item}
            removeClick={handleClick.bind(this, item)}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
  return <div className="section is-medium">{arr}</div>;
};

const Notification = ({ title, removeClick }) => (
  <div className="notification is-link is-light">
    <p className="title">{title}</p>
    <button className="is-link is-outlined is-light" onClick={removeClick}>
      Remove
    </button>
  </div>
);

export default Test;
