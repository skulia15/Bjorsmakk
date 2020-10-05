import BreweryFormReview from './BreweryFormReview';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BreweryForm from './BreweryForm';
import { connect } from 'react-redux';

class BreweryNew extends Component {
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <BreweryFormReview
                onCancel={() => this.setState({ showReview: false })}
            />;
        }
        return <BreweryForm onBrewerySubmit={() => this.setState({ showReview: true })} />;
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

BreweryNew = connect(mapStateToProps)(BreweryNew);

export default reduxForm({
    form: 'breweryForm'
})(BreweryNew);



