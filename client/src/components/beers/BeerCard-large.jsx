import React from "react";
import cardStyle from "../card/Card.module.scss";
import { BeerTypes } from "./BeerTypes";


export const BeerCardLarge = ({ beer }) => {
  return (
    <div className={`${cardStyle.card} ${cardStyle.cardLarge}`}>
      <span className={cardStyle.cardHeading}>{beer.name}</span>
      <span className={cardStyle.cardTopRight}>{beer.percentage}%</span>
      <span className={cardStyle.cardSubHeading}>{beer.brewery ? beer.brewery.name : ''}</span>
      <span className={cardStyle.cardSubHeading}>{beer.brewery && beer.brewery.country ? beer.brewery.country.name : ''}</span>
      <div className={cardStyle.cardBottomText}>
        <BeerTypes beerTypes={beer.type} />
      </div>
    </div>
  );
};
