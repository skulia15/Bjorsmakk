import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchEvents } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../button/Button";

export const EventList = () => {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const Events = () => {
    if (!events) {
      return <div>Hleður viðburðum...</div>;
    }
    if(events.length === 0) {
      return <div>Þú hefur ekki verið skráður í viðburð.</div>;
    }

    return events.reverse().map((event) => {
      return (
        <Link to={auth ? `/events/${event._id}` : "/"} key={event._id}>
          <div className={style.singleValueListItem}>{event.name}</div>
        </Link>
      );
    });
  };

  return (
    <div className={style.listViewContainer}>
      <div className={style.listViewHeading}>
        <h1>Skráðir viðburðir</h1>
        <Link to={auth ? "/events/new" : "/"} className={style.buttonContainer}>
          <Button
            buttonText="Skrá Viðburð"
            iconName="arrow_forward"
            type="success"
          ></Button>
        </Link>
      </div>
      <div className={style.singleValueListContainer}>
        <Events />
      </div>
    </div>
  );
};
