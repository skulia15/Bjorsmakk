import React from "react";
import cardStyle from "../card/Card.module.scss";
import { BeerTypes } from "./BeerTypes";

export const BeerCard = ({ beer }) => {
  return (
    <div className={cardStyle.card}>
      <span className={cardStyle.cardHeading}>{beer.name ? beer.name : '...'}</span>
      <span className={cardStyle.cardTopRight}>{beer.percentage}%</span>
      <span className={cardStyle.cardSubHeading}>{beer.brewery?.name ? beer.brewery?.name : '...' }</span>
      <div className={cardStyle.cardBottomText}>
        <BeerTypes beerTypes={beer.type} />
      </div>
    </div>
  );
};
