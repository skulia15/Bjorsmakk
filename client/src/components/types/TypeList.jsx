import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTypes } from "../../actions";
import Button from "../button/Button";
import style from "../ListView.module.scss";

export const TypeList = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  function renderTypes() {
    if (!types) {
      return <div>Engir bjórflokkar skráðir</div>;
    }

    return types.reverse().map((beerType) => {
      return (
        <div className={style.singleValueListItem} key={beerType._id}>
          <span>{beerType.typeName}</span>
        </div>
      );
    });
  }

  return (
    <div className={style.listViewContainer}>
      <div className={style.listViewHeading}>
        <h1>Bjórflokkar</h1>
        <Link to={auth ? "/types/new" : "/"} className={style.buttonContainer}>
          <Button
            buttonText="Skrá Bjórflokk"
            iconName="arrow_forward"
            buttonType="success"
          ></Button>
        </Link>
      </div>
      <div className={style.singleValueListContainer}>{renderTypes()}</div>
    </div>
  );
};
