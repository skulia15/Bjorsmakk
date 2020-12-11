import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchSingleEvent, fetchPreviousRating, rateBeer } from "../../actions";

import { BeerCardLarge } from "../beers/BeerCard-large";
import ReactStars from "react-rating-stars-component";
import style from "../DetailView.module.scss";
import ratingStyle from "../rating/RatingStyle.module.scss";

export const BeerRate = ({ match, location }) => {
  const { beer } = location.state;
  const dispatch = useDispatch();

  const event = useSelector((state) =>
    state.events && state.events.length
      ? state.events.filter(function (item) {
          return item._id === match.params.id;
        })[0]
      : state.events
  );
  const rating = useSelector((state) => state.ratings);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSingleEvent(match.params.eventId));
  }, [dispatch, match.params.eventId]);

  useEffect(() => {
    if (event) {
      dispatch(
        fetchPreviousRating({
          eventId: event._id,
          beerId: beer._id,
          ratedById: auth._id,
        })
      );
    }
  }, [dispatch, event, beer, auth]);

  const ratingChanged = (newRating) => {
    dispatch(
      rateBeer({
        eventId: event._id,
        beerId: beer._id,
        ratedById: auth._id,
        rating: newRating,
      })
    );
  };

  const Ratings = () => {
    if (rating) {
      return (
        <ReactStars
          count={10}
          onChange={ratingChanged}
          size={34}
          isHalf="true"
          activeColor="#ffd700"
          value={rating.score}
        ></ReactStars>
      );
    } else {
      return (
        <ReactStars
          count={10}
          onChange={ratingChanged}
          size={34}
          isHalf="true"
          activeColor="#ffd700"
        ></ReactStars>
      );
    }
  };

  const BeerRateLoading = () => {
    return (
      <div className={style.detailView}>
        <h1>Sækir bjór...</h1>
      </div>
    );
  };

  if (event && (!rating || rating.beerId === beer._id)) {
    return (
      <div className={style.detailView}>
        <Link to={auth ? `/events/${event._id}` : "/"}>Til baka</Link>
        <h1>{event.name}</h1>
        <BeerCardLarge beer={beer} />
        <div className={ratingStyle.ratingContainer}>
          <Ratings />
          {rating && rating.score && (
            <span className={ratingStyle.ratingValue}>{rating.score} / 10</span>
          )}
        </div>
      </div>
    );
  } else {
    return <BeerRateLoading />;
  }
};
