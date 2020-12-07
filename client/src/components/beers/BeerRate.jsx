import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBeer, fetchSingleEvent } from "../../actions";
import { BeerCardLarge } from "../beers/BeerCard-large";
import ReactStars from "react-rating-stars-component";
import style from "../DetailView.module.scss";
import ratingStyle from "../rating/RatingStyle.module.scss";

export const BeerRate = (props) => {
  const [rating, setRating] = useState(0);
  const beer = useSelector((state) => state.beers);
  const event = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBeer(props.match.params.beerId));
    dispatch(fetchSingleEvent(props.match.params.eventId));
  }, [dispatch, props.match.params.beerId, props.match.params.eventId]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  if (!beer || beer.length === 0 || !event) {
    return <div className={style.detailView}>Hleður...</div>;
  } else {
    return (
      <div className={style.detailView}>
        <h1>{event.name}</h1>
        <BeerCardLarge beer={beer} />
        <div className={ratingStyle.ratingContainer}>
          <ReactStars
            count={10}
            onChange={ratingChanged}
            size={34}
            isHalf="true"
            activeColor="#ffd700"
          ></ReactStars>
          <span className={ratingStyle.ratingValue}>
            {rating !== 0 ? rating + " / 10" : ""}
          </span>
        </div>
      </div>
    );
  }
};
