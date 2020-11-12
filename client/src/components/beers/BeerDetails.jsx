import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchSingleBeer } from "../../actions";
// import style from "../ListView.module.scss";
// import Button from "../button/Button";

class BeerDetails extends Component {
  componentDidMount() {
    this.props.fetchSingleBeer(this.props.match.params.id);
  }
  renderDivider(index, len) {
    if (index < len - 1) {
      return <span>|</span>;
    }
  }
  renderBeerType(types) {
    if (!types) {
      return;
    }
    return (
      <span>
        {types.map((type, index) => {
          return <span key={index}>{type.typeName}{this.renderDivider(index, types.length)}</span>;
        })}
      </span>
    );
  }
  render() {
    const { beers } = this.props;
    return (
      <div>
        <h1>{beers.name}</h1>
        <div className="">
          <span>Áfengisprósenta: </span>
          <span>{beers.percentage}%</span>
        </div>
        <div className="">
          <span>Bjórflokkur: </span>
          {this.renderBeerType(beers.type)}
        </div>
        <div className="">
          <span>Brewery: </span>
          <span>{beers.brewery?.name}</span>
        </div>
        <div className="">
          <span>Upprunaland: </span>
          <span>{beers.brewery?.country.name}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, beers }) {
  console.log("beer", beers);
  return { auth, beers };
}

export default connect(mapStateToProps, { fetchSingleBeer })(BeerDetails);
