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

  function renderDivider(index, len) {
    if (index < len - 1) {
      return <span>|</span>;
    }
  }

  function renderBeerType(types) {
    if (!types) {
      return;
    }
    return (
      <span>
        {types.map((type, index) => {
          return (
            <span key={index}>
              {type.typeName}
              {renderDivider(index, types.length)}
            </span>
          );
        })}
      </span>
    );
  }

  const BeerEmpty = () => {
    return (
      <div className={style.detailView}>
        <h1>Sækir bjór...</h1>
      </div>
    );
  }

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
          {renderBeerType(beer.type)}
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
  }

  if (!beer || beer.length === 0) {
    dispatch(fetchSingleBeer(props.match.params.id));
    return <BeerEmpty />;
  } else {
    return <Beer />;
  }
};
