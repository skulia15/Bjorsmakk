import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBeers } from "../../actions";

import Button from "../button/Button";

import style from "../ListView.module.scss";
import beerStyle from "./BeerListItem.module.scss";
import cardStyle from "../card/Card.module.scss";

export const BeerList = () => {
  const beers = useSelector((state) => state.beers);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeers());
  }, [dispatch]);

  const BeerTypes = ({beerTypes}) => {
    if (beerTypes && beerTypes.length) {
      return beerTypes.map((type, i) => {
        if (i === 0) {
          return <span key={type._id}>{type.typeName}</span>;
        } else {
          return <span key={type._id}> | {type.typeName}</span>;
        }
      });
    }
    else {
      return (<span>Enginn flokkur</span>)
    }
  }

  return (
    <div className={style.listView}>
      <div className={style.listViewContainer}>
        <div className={style.listViewHeading}>
          <h1>Bjórlisti</h1>
          <Link
            to={auth ? "/beers/new" : "/"}
            className={style.buttonContainer}
          >
            <Button
              buttonText="Skrá bjór"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
        <div className={beerStyle.beerListContainer}>
            <Beers />
        </div>
      </div>
    </div>
  );

  function Beers() {
    if (beers && beers.length) {
      return beers.sort((a, b) => (a.name > b.name) ? 1 : -1).map((beer) => {
        return (
          <Link
            to={auth ? `/beers/${beer._id}` : "/"}
            className={beerStyle.beerListItemContainer}
            key={beer._id}
          >
            <div className={cardStyle.card}>
              <span className={cardStyle.cardHeading}>{beer.name}</span>
              <span className={cardStyle.cardTopRight}>{beer.percentage}%</span>
              <span className={cardStyle.cardSubHeading}>
                {beer.brewery.name}
              </span>
              <div className={cardStyle.cardBottomText}>
                <BeerTypes beerTypes={beer.type} />
              </div>
            </div>
          </Link>
        );
      });
    }
    else {
      return (<h1>Hleður Bjórum...</h1>)
    }
  }
};
