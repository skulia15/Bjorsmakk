import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderLogInOut() {
        switch (this.props.auth) {
            case null:
                return '';
            case false:
                return (
                    <li>
                        <a href="/auth/google">Google Innskráning</a>
                    </li>
                );
            default:
                return (
                    <li>
                        <a href="/api/logout">Útskrá</a>
                    </li>
                );
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/' : '/'}
                        className=""
                    >
                        Jólabjórsmakk
                    </Link>
                    <Link
                        to={this.props.auth ? '/beers' : '/'}
                        className=""
                    >
                        Bjórar
                    </Link>
                    <Link
                        to={this.props.auth ? '/breweries' : '/'}
                        className=""
                    >
                        Brugghús
                    </Link>
                    <ul className="right">{this.renderLogInOut()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
