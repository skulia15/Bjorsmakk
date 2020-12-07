import React from "react";

export const BeerTypes = ({ beerTypes }) => {
  if (beerTypes && beerTypes.length) {
    return beerTypes.map((type, i) => {
      if (i === 0) {
        return <span key={type._id}>{type.typeName}</span>;
      } else {
        return <span key={type._id}> | {type.typeName}</span>;
      }
    });
  } else {
    return <span>Enginn flokkur</span>;
  }
};
