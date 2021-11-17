import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import { Header } from "./header/Header";
import { Landing } from "./landing/Landing";

import {BeerForm} from "./beers/BeerForm";
import { BeerList } from "./beers/BeerList";
import { BeerDetails } from "./beers/BeerDetails";
import { BeerRate } from "./beers/BeerRate";

import TypeNew from "./types/TypeNew";
import { TypeList } from "./types/TypeList";

import { BreweryList } from "./breweries/BreweryList";
// import BreweryNew from "./breweries/BreweryNew";
import { BreweryDetails } from "./breweries/BreweryDetails";

import { CountryList } from "./countries/CountryList";
// import CountryNew from "./countries/CountryNew";

import { UserList } from "./users/UserList";

import { EventList } from "./events/EventList";
import EventNew from "./events/EventNew";
import { EventDetails } from "./events/EventDetails";

import "./base.scss";
import { BreweryForm } from "./breweries/BreweryForm";
import { CountryForm } from "./countries/CountryForm";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Landing} />

            <Switch>
              <Route exact path="/beers" component={BeerList} />
              <Route exact path="/beers/new" component={BeerForm} />
              <Route exact path="/beers/edit/:id" component={BeerForm} />
              <Route path="/beers/:id" component={BeerDetails} />
            </Switch>

            <Route exact path="/types" component={TypeList} />
            <Route path="/types/new" component={TypeNew} />

            <Switch>
              <Route exact path="/breweries" component={BreweryList} />
              <Route exact path="/breweries/new" component={BreweryForm} />
              <Route exact path="/breweries/edit/:id" component={BreweryForm} />
              <Route path="/breweries/:id" component={BreweryDetails} />
            </Switch>

            <Route exact path="/countries" component={CountryList} />
            <Route path="/countries/new" component={CountryForm} />

            <Route exact path="/users" component={UserList} />

            <Switch>
              <Route exact path="/events" component={EventList} />
              <Route exact path="/events/new" component={EventNew} />
              <Route exact path="/events/:id" component={EventDetails} />
            </Switch>

            <Route
              exact
              path="/events/:eventId/beer/:beerId"
              component={BeerRate}
            />
        </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
