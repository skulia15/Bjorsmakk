import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBeers } from "../../actions";
import Button from "../Button";
import style from "../ListView.module.scss";
import beerStyle from "./BeerListItem.module.scss";

class BeerList extends Component {
  componentDidMount() {
    this.props.fetchBeers();
  }
  renderBeers() {
    if (!this.props.beers) {
      return <div>Engir bjórar skráðir</div>;
    }
    return this.props.beers.reverse().map((beer) => {
      return (
        <div className={beerStyle.beerListItemContainer} key={beer._id}>
            <span className={beerStyle.beerTitle}>{beer.name}</span>
            <span>{beer.percentage}%</span>
            <span>{beer.type?.typeName}%</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <h1>Bjórlisti</h1>
          <div className={beerStyle.beerListContainer}>{this.renderBeers()}</div>
          <Link to={this.props.auth ? "/beers/new" : "/"}>
            <Button
              buttonText="Skrá bjór"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, beers }) {
  return { auth, beers };
}

export default connect(mapStateToProps, { fetchBeers })(BeerList);
