import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBeers } from "../../actions";
import Button from "../button/Button";

import style from "../ListView.module.scss";
import beerStyle from "./BeerListItem.module.scss";
import cardStyle from "../card/Card.module.scss";

class BeerList extends Component {
  componentDidMount() {
    this.props.fetchBeers();
  }
  renderBeerTypes(beer) {
    if (beer.type) {
      return beer.type.map((type, i) => {
        if (i == 0) {
          return <span key={type.id}>{type.typeName}</span>;
        } else {
          return <span key={type.id}> | {type.typeName}</span>;
        }
      });
    }
  }
  renderBeers() {
    if (!this.props.beers || !this.props.beers.length) {
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
            <h1>Bjórlisti</h1>
            <Link to={this.props.auth ? "/beers/new" : "/"} className={style.buttonContainer}>
              <Button
                buttonText="Skrá bjór"
                iconName="arrow_forward"
                type="success"
              ></Button>
            </Link>
          </div>
          <div className={beerStyle.beerListContainer}>
            {this.renderBeers()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, beers }) {
  return { auth, beers };
}

export default connect(mapStateToProps, { fetchBeers })(BeerList);
