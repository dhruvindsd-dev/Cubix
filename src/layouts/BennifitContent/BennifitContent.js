import React from "react";
import Card1 from "../../components/ProductCard/Card1/Card1";

const BennifitContent = ({ title, cards }) => {
  return (
    <div className="section pb-0">
      <p className="is-size-3 has-text-weight-semibold has-text-primary">
        {title}
      </p>
      <div className="columns is-multiline pt-6">
        {cards.map((item, i) => (
          <div key={i} className="column is-3">
            <Card1 smallCardObj={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BennifitContent;
