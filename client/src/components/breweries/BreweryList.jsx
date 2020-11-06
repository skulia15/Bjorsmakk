import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBreweries } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../Button";

class BreweryList extends Component {
  componentDidMount() {
    this.props.fetchBreweries();
  }
  renderBreweries() {
    if (!this.props.breweries) {
      return <div>Engin brugghús skráð</div>;
    }
    return this.props.breweries.reverse().map((brewery) => {
		return (
			<div className="" key={brewery._id}>
				<span className="">{brewery.name}</span>
         - 
				<span className="">{brewery.country}</span>
			</div>
		  );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <h1>Brugghús</h1>
          <div className="">
            {this.renderBreweries()}
          </div>
          <Link to={this.props.auth ? "/breweries/new" : "/"}>
            <Button
              buttonText="Skrá Brugghús"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, breweries }) {
  return { auth, breweries };
}

export default connect(mapStateToProps, { fetchBreweries })(BreweryList);
