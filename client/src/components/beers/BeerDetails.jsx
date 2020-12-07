import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleBeer } from "../../actions";
import style from "../DetailView.module.scss";

export const BeerDetails = (props) => {
  const dispatch = useDispatch();
  let beer = useSelector((state) => state.beers);
  
  if (beer.length > 1) {
    beer = beer.filter(function (item) {
      return item._id === props.match.params.id;
    })[0];
  }

  const BeerType = ({ types }) => {
    if (!types) {
      return;
    }
    return types.map((type, i) => {
      if (i < types.length - 1) {
        return <span key={i}>{type.typeName} | </span>;
      } else {
        return <span key={i}>{type.typeName}</span>;
      }
    });
  };

  const BeerEmpty = () => {
    return (
      <div className={style.detailView}>
        <h1>Sækir bjór...</h1>
      </div>
    );
  };

  const Beer = () => {
    return (
      <div className={style.detailView}>
        <h1>{beer.name}</h1>
        <div className="">
          <span>Áfengisprósenta: </span>
          <span>{beer.percentage}%</span>
        </div>
        <div className="">
          <span>Bjórflokkur: </span>
          <BeerType types={beer.type} />
        </div>
        <div className="">
          <span>Brewery: </span>
          <span>{beer.brewery?.name}</span>
        </div>
        <div className="">
          <span>Upprunaland: </span>
          <span>{beer.brewery?.country.name}</span>
        </div>
      </div>
    );
  };

  if (!beer || beer.length === 0) {
    dispatch(fetchSingleBeer(props.match.params.id));
    return <BeerEmpty />;
  } else {
    return <Beer />;
  }
};
