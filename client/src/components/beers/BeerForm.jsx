import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Multiselect } from "multiselect-react-dropdown";
import NumberInput from "../inputs/NumberInput";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import Button from "../button/Button";

import {
  fetchTypes,
  fetchBreweries,
  submitBeer,
  fetchSingleBeer,
  editBeer,
} from "../../actions";

import formStyle from "../Form.module.scss";
import styles from "../Form.module.scss";

export const BeerForm = ({ history, match }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();

  const { id } = match.params;
  const isEditMode = !!id;
  const types = useSelector((state) => state.types);
  const breweries = useSelector((state) => state.breweries);
  const beer = useSelector((state) => state.beers);
  const [selectedTypes, setSelectedTypes] = useState(0);

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(editBeer(id, data, history));
    } else {
      dispatch(submitBeer(data, history));
    }
  };

  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchBreweries());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBeer(id));
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    register("type"); // custom register type multiselect input
  }, [register]);

  useEffect(() => {
    if (isEditMode && beer && beer.length !== 0) {
      setValue("name", beer.name);
      setValue("percentage", beer.percentage);
      setValue("brewery", beer.brewery?._id);
      setValue("type", beer.type);
      setSelectedTypes(beer.type);
    }
  }, [beer]);

  const handleTypesChange = (values) => {
    setValue("type", values);
    setSelectedTypes(values);
  };

  return (
    <div
      className={`${styles.formContainer} ${styles.formContainer__centered}`}
    >
      <div className={styles.formHeader}>
        Skrá Bjór
      </div>

      <form
        name="beerForm"
        className={styles.standardForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputsContainer}>
          <TextInput
            label="Nafn"
            name="name"
            placeholder=" "
            ref={register}
            required
          ></TextInput>
          <NumberInput
            label="Prósenta % (dæmi: 4.5 )"
            name="percentage"
            ref={register}
            required
          />
          <div
            className={`${formStyle.form__group}`}
            style={{ maxWidth: "290px" }}
          >
            <label className={formStyle.form__label}>Bjórflokkur</label>
            <Multiselect
              options={types} // Options to display in the dropdown
              selectedValues={selectedTypes} // Preselected value to persist in dropdown
              displayValue="typeName" // Property name to display in the dropdown options
              onSelect={handleTypesChange}
            />
          </div>
          <SelectInput
            label="Brugghús"
            name="brewery"
            options={breweries}
            optionKey="name"
            valueKey="_id"
            ref={register}
          ></SelectInput>
        </div>

        <div className={styles.buttonContainer}>
          {/* todo: clickhandler not working */}
          <Link to="/beers">
            <Button buttonText="Hætta við" buttonType="cancel"></Button>
          </Link>

          {/* <a
            href="/beers"
          > */}
          <Button
            buttonText="Skrá Bjór"
            iconName="arrow_forward"
            buttonType="success"
            onClickMethod={onSubmit}
          />
          {/* </a> */}
        </div>
      </form>
    </div>
  );
};
