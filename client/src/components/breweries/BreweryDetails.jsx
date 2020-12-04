import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleBrewery } from "../../actions";
import { fetchBeersForBrewery } from "../../actions";
import style from "../DetailView.module.scss";
import cardStyle from "../card/Card.module.scss";
import beerStyle from "../beers/BeerListItem.module.scss";

export const BreweryDetails = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBrewery(props.match.params.id));
    dispatch(fetchBeersForBrewery(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const brewery = useSelector((state) => state.breweries);
  const beers = useSelector((state) => state.beers);

  const BreweryEmpty = () => {
    return (
      <div>
        <h1>Sækir gögn...</h1>
      </div>
    );
  };

  const Brewery = () => {
    return (
      <div>
        <h1>
          {brewery.name} -{" "}
          {brewery.country ? brewery.country.name : "Land ekki skráð"}
        </h1>
      </div>
    );
  };

  // TODO: reuse - copy of beerList
  const BeerTypes = ({ beerTypes }) => {
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

  const BeersFromBrewery = () => {
    return beers.map((beer) => {
      return (
        <div className={cardStyle.card} key={beer._id}>
          <span className={cardStyle.cardHeading}>{beer.name}</span>
          <span className={cardStyle.cardTopRight}>{beer.percentage}%</span>
          <span className={cardStyle.cardSubHeading}>{brewery.name}</span>
          <div className={cardStyle.cardBottomText}>
            <BeerTypes beerTypes={beer.type} />
          </div>
        </div>
      );
    });
  };

  if (!brewery || brewery.length === 0) {
    return (
      <div className={style.detailView}>
        <BreweryEmpty />
      </div>
    );
  } else {
    return (
      <div className={style.detailView}>
        <Brewery />
        <div className={beerStyle.beerListDetailContainer}>
          <BeersFromBrewery />
        </div>
      </div>
    );
  }
};
