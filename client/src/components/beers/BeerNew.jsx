import BeerFormReview from './BeerFormReview';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BeerForm from './BeerForm';
import { connect } from 'react-redux';

class BeerNew extends Component {
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <BeerFormReview
                onCancel={() => this.setState({ showReview: false })}
            />;
        }
        return <BeerForm className="formContainer" onBeerSubmit={() => this.setState({ showReview: true })} />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

BeerNew = connect(mapStateToProps)(BeerNew);

export default reduxForm({
    form: 'beerForm'
})(BeerNew);



