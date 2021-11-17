import React from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../button/Button";

import TextInput from "../inputs/TextInput";

import styles from "../Form.module.scss";
import { submitCountry } from "../../actions";

export const CountryForm = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(submitCountry(data, history));
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>Skrá Land</div>

      <form
        name="countryForm"
        className={styles.standardForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputsContainer}>
          <TextInput
            placeholder=""
            label="Land"
            name="name"
            ref={register}
            required
          ></TextInput>
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/countries">
            <Button
              onClick={() => this.nextPath("/countries")}
              buttonText="Hætta við"
              buttonType="cancel"
            ></Button>
          </Link>

          <Button
            buttonText="Skrá Land"
            iconName="arrow_forward"
            buttonType="success"
            onClickMethod={onSubmit}
          ></Button>
        </div>
      </form>
    </div>
  );
}