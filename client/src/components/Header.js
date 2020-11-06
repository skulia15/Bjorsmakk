import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import "./GoogleButton.scss";

class Header extends Component {
  renderLogInOut() {
    switch (this.props.auth) {
      case null:
        return "";
      case false:
        return (
          <div
            id="gSignInWrapper"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/auth/google";
            }}
          >
            <div id="customBtn">
              <span className="icon"></span>
              <span className="buttonText">Sign in with Google</span>
            </div>
          </div>
        );
      default:
        return (
          <li className={styles.navigationLink}>
            <a href="/api/logout">Útskrá</a>
          </li>
        );
    }
  }

  renderLinks() {
    if (this.props.auth) {
      return (
        <React.Fragment>
          <Link
            to={this.props.auth ? "/beers" : "/"}
            className={styles.navigationLink}
          >
            Bjórar
          </Link>
          <Link
            to={this.props.auth ? "/breweries" : "/"}
            className={styles.navigationLink}
          >
            Brugghús
          </Link>
          <Link
            to={this.props.auth ? "/types" : "/"}
            className={styles.navigationLink}
          >
            Bjórflokkar
          </Link>
          <Link
            to={this.props.auth ? "/countries" : "/"}
            className={styles.navigationLink}
          >
            Lönd
          </Link>
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <nav className={styles.navigation}>
        <div className={styles.linkContainer}>
          <Link
            to={this.props.auth ? "/" : "/"}
            className={styles.navigationLink}
          >
            Jólabjórsmakk
          </Link>
          {this.renderLinks()}
          <div className={styles.logInOutLink}>{this.renderLogInOut()}</div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
