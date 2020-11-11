import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../button/Button";


class EventList extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  renderEvents() {
    if (!this.props.events || !this.props.events.length) {
      return (<div>Engir viðburðir skráðir!</div>);
    }

    return this.props.events.reverse().map((event) => {
      return (
        <div className="" key={event._id}>
          <span className="">{event.name}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <h1>Skráðir viðburðir</h1>
          <div className="">{this.renderEvents()}</div>
          <Link to={this.props.auth ? "/events/new" : "/"}>
            <Button
              buttonText="Skrá Viðburð"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, events }) {
  console.log('events', events);
  return { auth, events };
}

export default connect(mapStateToProps, { fetchEvents })(EventList);
