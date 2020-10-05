import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBreweries } from '../../actions';

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
				<div className="card blue-grey darken-1" key={brewery._id}>
					<div className="card-content white-text">
						<span className="card-title">{brewery.name}</span>
						<p>{brewery.country}</p>
					</div>
				</div>
			);
		});
	}
	render() {
		return (
			<div>
				<h1>Brugghús</h1>
				<div className="brewery-list__list">{this.renderBreweries()}</div>
				<Link to={this.props.auth ? '/breweries/new' : '/'} className="btn">
					Bæta við Brugghúsi
				</Link>
			</div>
		);
	}
}

function mapStateToProps({ auth, breweries }) {
	return { auth, breweries };
}

export default connect(mapStateToProps, { fetchBreweries })(BreweryList);
