import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleBeer, fetchRatingsForBeer } from "../../actions";
import style from "../DetailView.module.scss";
import ratingStyle from "../rating/RatingStyle.module.scss";
import ReactStars from "react-rating-stars-component";

export const BeerDetails = ({ match }) => {
  const dispatch = useDispatch();
  const beer = useSelector((state) =>
    state.beers && state.beers.length
      ? state.beers.filter(function (item) {
          return item._id === match.params.id;
        })[0]
      : state.beers
  );

  const ratings = useSelector((state) => state.ratings);

  useSelector((state) => console.log(state));

  useEffect(() => {
    dispatch(fetchSingleBeer(match.params.id));
    dispatch(fetchRatingsForBeer(match.params.id));
  }, [dispatch, match.params.id]);

  const BeerType = ({ types }) => {
    if (!types) {
      return null;
    }
    return types.map((type, i) => {
      if (i < types.length - 1) {
        return <span key={i}>{type.typeName} | </span>;
      } else {
        return <span key={i}>{type.typeName}</span>;
      }
    });
  };

  const BeerLoading = () => {
    return (
      <div className={style.detailView}>
        <h1>Sækir bjór...</h1>
      </div>
    );
  };

  const Beer = () => {
    return (
      <div className={style.detailView}>
        <h1>{beer.name}</h1>
        <div className="">
          <span>Áfengisprósenta: </span>
          <span>{beer.percentage}%</span>
        </div>
        <div>
          <span>Bjórflokkur: </span>
          <BeerType types={beer.type} />
        </div>
        <div className="">
          <span>Brewery: </span>
          <span>{beer.brewery?.name}</span>
        </div>
        <div className="">
          <span>Upprunaland: </span>
          <span>{beer.brewery?.country.name}</span>
        </div>
      </div>
    );
  };

  const RatingCard = ({ rating }) => {
    return (
      <div className={ratingStyle.ratingCard} key={rating._id}>
        <div className={ratingStyle.ratingCardHeading}>{rating.user.name}</div>
        <div className={ratingStyle.ratingCardSubHeading}>
          {rating.event.name}
        </div>
        <div className={ratingStyle.score}>{rating.score}★</div>
        <div className={ratingStyle.starRatingContainer}>
          <ReactStars
            count={10}
            size={24}
            edit={false}
            isHalf="true"
            activeColor="#ffd700"
            value={rating.score}
          />
        </div>
      </div>
    );
  };

  const PreviousRatings = () => {
    if (!ratings) {
      return (
        null
      );
    } 
    else if (ratings.length === 0) {
      return (
        <div>
          Þessum bjór hefur ekki verið gefin einkunn
        </div>
      );
    }
    else {
      console.log(ratings);
      return ratings.reverse().map((rating) => {
        return <RatingCard rating={rating} key={rating._id} />;
      });
    }
  };

  if (!beer || beer.length === 0) {
    return <BeerLoading />;
  } else {
    return (
      <div>
        <Beer />
        <div className={ratingStyle.ratingListContainer}>
          <PreviousRatings />
        </div>
      </div>
    );
  }
};
