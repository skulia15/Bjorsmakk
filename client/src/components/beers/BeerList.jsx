import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBeers } from '../../actions';

class BeerList extends Component {
	componentDidMount() {
		this.props.fetchBeers();
	}
	renderBeers() {
		if (!this.props.beers) {
			return <div>Engir bjórar skráðir</div>;
		}
		return this.props.beers.reverse().map(beer => {
				return (
						<div className="card blue-grey darken-1" key={beer._id}>
								<div className="card-content white-text">
										<span className="card-title">{beer.name}</span>
										<p>
												{beer.percentage}%
										</p>
								</div>
						</div>
				)
		})
}
	render() {
		return (
			<div>
				<h1>Bjórlisti</h1>
				<div className="beer-list__list">{this.renderBeers()}</div>
				<Link to={this.props.auth ? '/beers/new' : '/'} className="btn">
					Bæta við
				</Link>
			</div>
		);
	}
}

function mapStateToProps({ auth, beers }) {
	return { auth, beers };
}

export default connect(mapStateToProps , { fetchBeers })(BeerList);
