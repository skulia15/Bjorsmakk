import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBeers } from "../../actions";

import Button from "../button/Button";
import { BeerCard } from "./BeerCard";

import style from "../ListView.module.scss";
import beerStyle from "./BeerListItem.module.scss";

export const BeerList = () => {
  const beers = useSelector((state) => state.beers);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeers());
  }, [dispatch]);

  const Beers = () => {
    if (beers && beers.length) {
      return beers
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((beer) => {
          return (
            <Link
              to={auth ? `/beers/${beer._id}` : "/"}
              className={beerStyle.beerListItemContainer}
              key={beer._id}
            >
              <BeerCard beer={beer} />
            </Link>
          );
        });
    } else {
      return <h1>Hleður Bjórum...</h1>;
    }
  };

  return (
    // <div className={style.listView}>
    <div className={style.listViewContainer}>
      <div className={style.listViewHeading}>
        <h1>Bjórlisti</h1>
        <Link to={auth ? "/beers/new" : "/"} className={style.buttonContainer}>
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
  );
};
