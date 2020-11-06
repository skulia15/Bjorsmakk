import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import TypeForm from './TypeForm';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TypeNew extends Component {

    submit = values => {
        this.props.submitType(values, this.props.history)
    }

    renderContent() {
        return 
    }

    render() {
        return (
            <div>
                <TypeForm className="formContainer" onTypeSubmit={this.submit} />;
            </div>
        );
    }
}
 
function mapStateToProps({ auth }) {
    return { auth };
}

TypeNew = connect(mapStateToProps, actions)(withRouter(TypeNew));

export default reduxForm({
    form: 'typeForm'
})(TypeNew);



