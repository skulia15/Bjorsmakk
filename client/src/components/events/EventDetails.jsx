import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BeerCard } from "../beers/BeerCard";

import { fetchSingleEvent } from "../../actions";
import style from "../DetailView.module.scss";
import beerStyle from "../beers/BeerListItem.module.scss";

export const EventDetails = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleEvent(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const auth = useSelector((state) => state.auth);
  const event = useSelector((state) => state.events);

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
            to={auth ? `/events/${event._id}/beer/${beer._id}` : "/"}
            className={beerStyle.beerListItemContainer}
            key={beer._id}
          >
            <BeerCard key={beer._id} beer={beer} />
          </Link>
        );
      });
    } else {
      return <span>Enginn bjór skráður</span>;
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
