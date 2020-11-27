import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchSingleEvent } from "../../actions";
// import style from "../ListView.module.scss";
// import Button from "../button/Button";
import { Link } from "react-router-dom";
import cardStyle from "../card/Card.module.scss";
import beerStyle from "../beers/BeerListItem.module.scss";
import style from "../ListView.module.scss";

class EventDetails extends Component {
  componentDidMount() {
    this.props.fetchSingleEvent();
  }
  renderBeers() {
    if (!this.props.events?.beers || !this.props.events?.beers.length) {
      return <div>Engir bjórar skráðir</div>;
    }
    return this.props.beers.map((beer) => {
      return (
        <Link
          to={this.props.auth ? `/beers/${beer._id}` : "/"}
          className={beerStyle.beerListItemContainer}
          key={beer._id}
        >
          <div className={cardStyle.card}>
            <span className={cardStyle.cardHeading}>{beer.name}</span>
            <span className={cardStyle.cardTopRight}>{beer.percentage}%</span>
            <span className={cardStyle.cardSubHeading}>
              {beer.brewery.name}
            </span>
            <div className={cardStyle.cardBottomText}>
              {this.renderBeerTypes(beer)}
            </div>
          </div>
        </Link>
      );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <div className={style.listViewHeading}>
            <h1>EVENT TITLE HERE</h1>
          </div>

          <div className={beerStyle.beerListContainer}>
            {this.renderBeers()}
          </div>

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
