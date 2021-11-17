import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCountries } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../button/Button";

export const CountryList = (props) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  function Countries() {
    if (!countries) {
      return <div>Engin lönd skráð</div>;
    }
    return countries.sort((a, b) => (a.name > b.name) ? 1 : -1).map((country) => {
      return (
        <div className={style.singleValueListItem} key={country._id}>
          <span>{country.name}</span>
        </div>
      );
    });
  }

  return (
    <div className={style.listViewContainer}>
      <div className={style.listViewHeading}>
        <h1>Skráð Lönd</h1>
        <Link
          to={auth ? "/countries/new" : "/"}
          className={style.buttonContainer}
        >
          <Button
            buttonText="Skrá Land"
            iconName="arrow_forward"
            buttonType="success"
          ></Button>
        </Link>
      </div>
      <div className={style.singleValueListContainer}>
        <Countries />
      </div>
    </div>
  );
};
