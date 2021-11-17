import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../button/Button";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import { fetchCountries, fetchSingleBrewery } from "../../actions";

import {
  submitBrewery,
  editBrewery,
} from "../../actions";


import styles from "../Form.module.scss";

export const BreweryForm = ({ history, match }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const { id } = match.params;
  const isEditMode = !!id;
  const countries = useSelector((state) => state.countries);
  const brewery = useSelector((state) => state.breweries);

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(editBrewery(id, data, history));
    } else {
      dispatch(submitBrewery(data, history));
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBrewery(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isEditMode && brewery) {
      console.log(brewery);
      
      setValue("name", brewery.name);
      setValue("country", brewery.country?._id);
    }
  }, [brewery, isEditMode, setValue]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>Skrá Brugghús</div>

      <form
        name="breweryForm"
        className={styles.standardForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputsContainer}>
          <TextInput
            placeholder=""
            label="Brugghús"
            name="name"
            ref={register}
            required
          ></TextInput>
          
          <SelectInput
            label="Upprunaland"
            name="country"
            options={countries}
            optionKey="name"
            valueKey="_id"
            ref={register}
          ></SelectInput>
          
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/breweries">
            <Button
              onClick={() => this.nextPath("/breweries")}
              buttonText="Hætta við"
              buttonType="cancel"
            ></Button>
          </Link>
          
            <Button
            buttonText="Skrá brugghús"
            iconName="arrow_forward"
            buttonType="success"
            onClickMethod={onSubmit}
          />
        </div>
      </form>
    </div>
  );
}