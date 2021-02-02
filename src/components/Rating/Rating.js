import React from "react";

const Rating = ({ num }) => {
  if (num <= 0) return null;
  return (
    <>
      <span className="is-size-7">
        <span className="l-opacity has-text-light mr-2">Rating :</span>
        {Array(num)
          .fill(1)
          .map((_, i) => (
            <i key={i} className="fas fa-star has-text-warning"></i>
          ))}
      </span>
      <br />
    </>
  );
};

export default Rating;
