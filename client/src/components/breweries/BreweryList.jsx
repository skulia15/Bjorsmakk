import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBreweries } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../button/Button";
import cardStyle from "../card/Card.module.scss";

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
        <div className={cardStyle.card} key={brewery._id}>
          <span className={cardStyle.cardHeading}>{brewery.name}</span>
          <span className={cardStyle.cardSubHeading}>
            {brewery.country?.name}
          </span>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <div className={style.listViewHeading}>
            <h1>Brugghús</h1>
            <Link to={this.props.auth ? "/breweries/new" : "/"} className={style.buttonContainer}>
            <Button
              buttonText="Skrá Brugghús"
              iconName="arrow_forward"
              type="success"
            ></Button>
            </Link>
          </div>
          <div className={style.listContainer}>{this.renderBreweries()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, breweries }) {
  return { auth, breweries };
}

export default connect(mapStateToProps, { fetchBreweries })(BreweryList);
