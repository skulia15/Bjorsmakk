import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleEvent } from "../../actions";
// import style from "../ListView.module.scss";
// import Button from "../button/Button";

class EventDetails extends Component {
  componentDidMount() {
    this.props.fetchSingleEvent();
  }
  render() {
    return (
      <div>
        <div>
          <h1>EVENT TITLE HERE</h1>
          <div className="">EVENT DETAILS HERE</div>
          {/* <Link to={this.props.auth ? "/events/new" : "/"}>
            <Button
              buttonText="Skrá Viðburð"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, events }) {
  console.log("events", events);
  return { auth, events };
}

export default connect(mapStateToProps, { fetchSingleEvent })(EventDetails);
