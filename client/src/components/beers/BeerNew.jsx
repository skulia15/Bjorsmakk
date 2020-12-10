import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import BeerForm from "./BeerForm";
import { connect } from "react-redux";
import * as actions from "../../actions";

class BeerNew extends Component {
  submit = (values) => {
    this.props.submitBeer(values, this.props.history);
  };
  render() {
    return <BeerForm className="formContainer" onBeerSubmit={this.submit} />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

BeerNew = connect(mapStateToProps, actions)(withRouter(BeerNew));

export default reduxForm({
  form: "beerForm",
})(BeerNew);
