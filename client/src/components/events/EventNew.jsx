import React, { Component } from "react";
import { reduxForm } from "redux-form";
import EventForm from "./EventForm";
import { connect } from "react-redux";
import * as actions from "../../actions";

class EventNew extends Component {
  submit = (values) => {
    this.props.submitEvent(values, this.props.history);
  };
  render() {
    return <EventForm onEventSubmit={this.submit} />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

EventNew = connect(mapStateToProps, actions)(EventNew);

export default reduxForm({
  form: "eventForm",
})(EventNew);
