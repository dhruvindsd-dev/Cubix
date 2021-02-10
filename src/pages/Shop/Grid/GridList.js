import React from "react";
import "./style.css";
import cube from "../../../assets/images/types/3x3.jpg";
import gearCube from "../../../assets/images/types/gear.jpg";
import mirror from "../../../assets/images/types/mirror.jpg";
import skewb from "../../../assets/images/types/skewb.jpg";
import locking from "../../../assets/images/types/locking.jpg";
import megamix from "../../../assets/images/types/megamix.jpg";
import pyramix from "../../../assets/images/types/pyramix.jpg";
import sqaureOne from "../../../assets/images/types/sqaureOne.jpg";
import GridItem from "./GridItem";

export const gridData = [
  { img: cube, title: "3x3 Speed Cubes", value: "Standard Speed Cube" },
  { img: gearCube, title: "Gear Cubes", value: "Gear Cube" },
  { img: mirror, title: "Mirror Cubes", value: "Mirror Cube" },
  { img: skewb, title: "Skewb Cubes", value: "Skewb" },
  { img: locking, title: "Locking Puzzles", value: "Locking Puzzels" },
  { img: megamix, title: "Megamix", value: "Megamix" },
  { img: pyramix, title: "Pyramix", value: "Pyramix" },
  { img: sqaureOne, title: "Square - 1 ", value: "Square-1" },
];

const GridList = () => {
  let section1 = gridData
    .slice(0, 3)
    .map((item) => (
      <GridItem
        key={item.title}
        img={item.img}
        title={item.title}
        linkName={item.value}
      />
    ));
  let section2 = gridData
    .slice(3, 5)
    .map((item) => (
      <GridItem
        key={item.title}
        img={item.img}
        title={item.title}
        figClass="is-2by1"
        linkName={item.value}
      />
    ));
  let section3 = gridData
    .slice(5)
    .map((item) => (
      <GridItem
        key={item.title}
        img={item.img}
        title={item.title}
        linkName={item.value}
      />
    ));

  return (
    <div className="section">
      <p className="title has-text-primary">Shop By Categories</p>
      <div className="columns">{section1}</div>
      <div className="columns">{section2}</div>
      <div className="columns">{section3}</div>
    </div>
  );
};

export default GridList;
