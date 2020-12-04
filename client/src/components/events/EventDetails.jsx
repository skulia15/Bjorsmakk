import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleEvent } from "../../actions";
import style from "../DetailView.module.scss";
import beerStyle from "../beers/BeerListItem.module.scss";
import cardStyle from "../card/Card.module.scss";


export const EventDetails = (props) => {
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(fetchSingleEvent(props.match.params.id));
  }, [dispatch, props.match.params.id]);

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
        <h1>
          {event.name}
        </h1>
      </div>
    );
  };

  // TODO: reuse - copy of beerList
  const BeerTypes = ({ beerTypes }) => {
    if (beerTypes && beerTypes.length) {
      return beerTypes.map((type, i) => {
        if (i === 0) {
          return <span key={type._id}>{type.typeName}</span>;
        } else {
          return <span key={type._id}> | {type.typeName}</span>;
        }
      });
    } else {
      return <span>Enginn flokkur</span>;
    }
  };

  const BeersInEvent = () => {
    if(event.beers && event.beers.length){
      return event.beers.map((beer) => {
        return (
          <div className={cardStyle.card} key={beer._id}>
            <span className={cardStyle.cardHeading}>{beer.name}</span>
            <span className={cardStyle.cardTopRight}>{beer.percentage}%</span>
            <span className={cardStyle.cardSubHeading}>{beer.brewery.name}</span>
            <div className={cardStyle.cardBottomText}>
              <BeerTypes beerTypes={beer.type} />
            </div>
          </div>
        );
      });
    }
    else {
      return(
        <span>Enginn bjór skráður</span>
      )
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
  // return (
  //   <div className={style.listView}>
  //     <div className={style.listViewContainer}>
  //       <div className={style.listViewHeading}>
  //         <h1>EVENT TITLE HERE</h1>
  //       </div>

  //       {/* <div className={beerStyle.beerListContainer}> */}
  //         {/* <Beers /> */}
  //       {/* </div> */}
  //     </div>
  //   </div>
  // );
};
