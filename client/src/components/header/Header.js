import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import "../../components/button/GoogleButton.scss";

export const Header = () => {

  const auth = useSelector((state) => state.auth);

  const LogInOut = () => {
    switch (auth) {
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
          <div className={styles.navigationLink}>
            <a href="/api/logout">Útskrá</a>
          </div>
        );
    }
  };

  const Links = () => {
    if (auth) {
      return (
        <React.Fragment>
          <Link to={auth ? "/beers" : "/"} className={styles.navigationLink}>
            Bjórar
          </Link>
          <Link
            to={auth ? "/breweries" : "/"}
            className={styles.navigationLink}
          >
            Brugghús
          </Link>
          <Link to={auth ? "/types" : "/"} className={styles.navigationLink}>
            Bjórflokkar
          </Link>
          <Link
            to={auth ? "/countries" : "/"}
            className={styles.navigationLink}
          >
            Lönd
          </Link>
          <Link to={auth ? "/users" : "/"} className={styles.navigationLink}>
            Notendur
          </Link>

          <Link to={auth ? "/events" : "/"} className={styles.navigationLink}>
            Viðburðir
          </Link>
        </React.Fragment>
      );
    }
    else {
      return (null)
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.linkContainer}>
        <Link to={auth ? "/" : "/"} className={styles.navigationLink}>
          <span className={styles.icon}></span>
          Jólabjórsmakk
        </Link>
        <Links />
        <div className={styles.logInOutLink}>
          <LogInOut />
        </div>
      </div>
    </nav>
  );
};
