import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSingleBrewery } from "../../actions";
import { fetchBeersForBrewery } from "../../actions";
import style from "../DetailView.module.scss";
import { BeerCard } from "../beers/BeerCard";

import beerStyle from "../beers/BeerListItem.module.scss";

export const BreweryDetails = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBrewery(props.match.params.id));
    dispatch(fetchBeersForBrewery(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const auth = useSelector((state) => state.auth);
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

  // // TODO: reuse - copy of beerList
  // const BeerTypes = ({ beerTypes }) => {
  //   if (beerTypes && beerTypes.length) {
  //     return beerTypes.map((type, i) => {
  //       if (i === 0) {
  //         return <span key={type._id}>{type.typeName}</span>;
  //       } else {
  //         return <span key={type._id}> | {type.typeName}</span>;
  //       }
  //     });
  //   } else {
  //     return <span>Enginn flokkur</span>;
  //   }
  // };

  const BeersFromBrewery = () => {
    if (beers.length > 0) {
      return beers.map((beer) => {
        beer.brewery = brewery;
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
    }
    else {
      return (
        <div>Hleður brugghúsi...</div>
      )
    }
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
        <button onClick={() => props.history.goBack()}>Til baka</button>
        <Brewery />
        <div className={beerStyle.beerListDetailContainer}>
            <div className={style.controls}>
          <Link to={auth ? `/breweries/edit/${brewery._id}` : "/"} className={style.edit}>Breyta</Link>
          {/* <div className={style.delete} onClick={() => handleDelete()}>Eyða</div> */}
        </div>
          <BeersFromBrewery />
        </div>
      </div>
    );
  }
};
