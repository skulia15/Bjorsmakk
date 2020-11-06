import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BreweryForm from './BreweryForm';
import { connect } from 'react-redux';
import * as actions from "../../actions";

class BreweryNew extends Component {
    submit = values => {
        this.props.submitBrewery(values, this.props.history)
    }
    render() {
        return (
            <BreweryForm onBrewerySubmit={this.submit} />
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

BreweryNew = connect(mapStateToProps, actions)(BreweryNew);

export default reduxForm({
    form: 'breweryForm'
})(BreweryNew);



