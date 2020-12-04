import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBreweries } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../button/Button";
import cardStyle from "../card/Card.module.scss";

export const BreweryList = (props) => {
  const breweries = useSelector((state) => state.breweries);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBreweries());
  }, [dispatch]);

  const Breweries = () => {
    if (!breweries || !breweries.length) {
      return <h1>Hleður brugghúsum...</h1>;
    }

    return breweries.sort((a, b) => (a.name > b.name) ? 1 : -1).map((brewery) => {
      return (
        <Link
          to={auth ? `/breweries/${brewery._id}` : "/"}
          className={style.beerListItemContainer}
          key={brewery._id}
        >
          <div className={cardStyle.card} key={brewery._id}>
            <span className={cardStyle.cardHeading}>{brewery.name}</span>
            <span className={cardStyle.cardSubHeading}>
              {brewery.country?.name}
            </span>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className={style.listView}>
      <div className={style.listViewContainer}>
        <div className={style.listViewHeading}>
          <h1>Brugghús</h1>
          <Link
            to={auth ? "/breweries/new" : "/"}
            className={style.buttonContainer}
          >
            <Button
              buttonText="Skrá Brugghús"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
        <div className={style.listContainer}>
          <Breweries />
        </div>
      </div>
    </div>
  );
};
