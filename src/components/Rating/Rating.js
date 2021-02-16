import React from "react";
import { GiRoundStar } from "react-icons/gi";

const Rating = ({ num }) => {
  if (num <= 0) return null;
  return (
    <>
      <span className="is-size-7">
        <span className="l-opacity has-text-light mr-2">Rating :</span>
        {Array(num)
          .fill(1)
          .map((_, i) => (
            <GiRoundStar key={i} fill="yellow" />
          ))}
      </span>
      <br />
    </>
  );
};

export default Rating;
