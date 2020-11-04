import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

class Header extends Component {
    renderLogInOut() {
        switch (this.props.auth) {
            case null:
                return '';
            case false:
                return (
                    <li className={styles.navigationLink}>
                        <a href="/auth/google">Google Innskráning</a>
                    </li>
                );
            default:
                return (
                    <li className={styles.navigationLink}>
                        <a href="/api/logout">Útskrá</a>
                    </li>
                );
        }
    }
    render() {
        return (
            <nav className={styles.navigation}>
                <div className={styles.linkContainer}>
                    <Link
                        to={this.props.auth ? '/' : '/'}
                        className={styles.navigationLink}
                    >
                        Jólabjórsmakk
                    </Link>
                    <Link
                        to={this.props.auth ? '/beers' : '/'}
                        className={styles.navigationLink}
                    >
                        Bjórar
                    </Link>
                    <Link
                        to={this.props.auth ? '/breweries' : '/'}
                        className={styles.navigationLink}
                    >
                        Brugghús
                    </Link>
                    <div className={styles.logInOutLink}>
                        {this.renderLogInOut()}
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
