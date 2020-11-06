import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCountries } from "../../actions";
import style from "../ListView.module.scss";
import Button from "../Button";

class CountryList extends Component {
  componentDidMount() {
    this.props.fetchCountries();
    console.log(this.props);
  }
  renderCountries() {
    if (!this.props.countries) {
      return <div>Engin lönd skráð</div>;
    }
    return this.props.countries.reverse().map((country) => {
		return (
			<div className="" key={country._id}>
				<span className="">{country.name}</span>
			</div>
		  );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <h1>Skráð Lönd</h1>
          <div className="">
            {this.renderCountries()}
          </div>
          <Link to={this.props.auth ? "/countries/new" : "/"}>
            <Button
              buttonText="Skrá Land"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, countries }) {
  console.log('MAPPING STATE', countries)
  return { auth, countries };
}

export default connect(mapStateToProps, { fetchCountries })(CountryList);