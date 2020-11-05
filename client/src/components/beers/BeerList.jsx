import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBeers } from "../../actions";
import Button from "../Button";
import style from "../ListView.module.scss";

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
        <div className="" key={beer._id}>
          <div className="">
            <span className="">{beer.name}</span>
            <p>{beer.percentage}%</p>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={style.listView}>
		  <div className={style.listViewContainer}>
			<h1>Bjórlisti</h1>
			<div className="beer-list__list">{this.renderBeers()}</div>
			<Link to={this.props.auth ? "/beers/new" : "/"} className="btn">
			<Button
				buttonText="Bæta við"
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
