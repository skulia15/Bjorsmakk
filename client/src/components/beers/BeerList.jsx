import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBeers } from "../../actions";

import Button from "../button/Button";
import { BeerCard } from "./BeerCard";

import style from "../ListView.module.scss";
import beerStyle from "./BeerListItem.module.scss";

export const BeerList = () => {
  const dispatch = useDispatch();

  const beersResponse = useSelector((state) => state.beers);
  const auth = useSelector((state) => state.auth);
  const { beers, loading = true } = beersResponse;
  console.log(loading);

  useEffect(() => {
    dispatch(fetchBeers());
  }, [dispatch]);

  const Beers = () => {
    if (loading) {
      console.log(loading);
      return <h1>Hleður Bjórum...</h1>;
    }
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
      return <div>Enginn bjór hefur verið skráður</div>;
    }
  };

  return (
    <div className={style.listViewContainer}>
      <div className={style.listViewHeading}>
        <h1>Bjórlisti</h1>
        <Link to={auth ? "/beers/new" : "/"} className={style.buttonContainer}>
          <Button
            buttonText="Skrá bjór"
            iconName="arrow_forward"
            buttonType="success"
          ></Button>
        </Link>
      </div>
      <div className={beerStyle.beerListContainer}>
        <Beers />
      </div>
    </div>
  );
};
