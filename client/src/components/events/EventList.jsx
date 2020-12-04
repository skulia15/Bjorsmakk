import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchEvents } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../button/Button";

export const EventList = (props) => {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const Events = () => {
    if (!events || !events.length) {
      return <div>Engir viðburðir skráðir!</div>;
    }

    return events.reverse().map((event) => {
      return (
        <Link
          to={auth ? `/events/${event._id}` : "/"}
          key={event._id}
        >
          <div key={event._id}>
            <span className="">{event.name}</span>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className={style.listView}>
      <div className={style.listViewContainer}>
        <h1>Skráðir viðburðir</h1>
        <Events />
        <Link to={auth ? "/events/new" : "/"}>
          <Button
            buttonText="Skrá Viðburð"
            iconName="arrow_forward"
            type="success"
          ></Button>
        </Link>
      </div>
    </div>
  );
};
