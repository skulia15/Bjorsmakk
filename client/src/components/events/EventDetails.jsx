import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BeerCard } from "../beers/BeerCard";

import { fetchSingleEvent } from "../../actions";
import style from "../DetailView.module.scss";
import beerStyle from "../beers/BeerListItem.module.scss";

export const EventDetails = ({match}) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const event = useSelector((state) => state.events && state.events.length ? state.events.filter(function (item) { return item._id === match.params.id; })[0] : state.events);

  useEffect(() => {
    dispatch(fetchSingleEvent(match.params.id));
  }, [dispatch, match.params.id]);

  const EventEmpty = () => {
    return (
      <div>
        <h1>Sækir gögn...</h1>
      </div>
    );
  };

  const Event = () => {
    return (
      <div>
        <h1>{event.name}</h1>
      </div>
    );
  };

  const BeersInEvent = () => {
    if (event.beers && event.beers.length) {
      return event.beers.map((beer) => {
        return (
          <Link
          to={{
            pathname: auth ? `/events/${event._id}/beer/${beer._id}` : "/",
            state: {
              beer
            }}}
            className={beerStyle.beerListItemContainer}
            key={beer._id ? beer._id : beer}
            
          >
            <BeerCard key={beer._id} beer={beer} />
          </Link>
        );
      });
    } else {
      return <span>Hleður...</span>;
    }
  };

  if (!event || event.length === 0) {
    return (
      <div className={style.detailView}>
        <EventEmpty />
      </div>
    );
  } else {
    return (
      <div className={style.detailView}>
        <Event />
        <div className={beerStyle.beerListDetailContainer}>
          <BeersInEvent />
        </div>
      </div>
    );
  }
};
