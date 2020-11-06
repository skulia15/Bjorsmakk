import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

import BeerNew from './beers/BeerNew';
import BeerList from './beers/BeerList';

import TypeNew from './types/TypeNew';
import TypeList from './types/TypeList';

import BreweryList from './breweries/BreweryList';
import BreweryNew from './breweries/BreweryNew';

import CountryList from './countries/CountryList';
import CountryNew from './countries/CountryNew';

import './base.scss';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />

                        <Route exact path="/beers" component={BeerList} />
                        <Route path="/beers/new" component={BeerNew} />

                        <Route exact path="/types" component={TypeList} />
                        <Route path="/types/new" component={TypeNew} />

                        <Route exact path="/breweries" component={BreweryList} />
                        <Route path="/breweries/new" component={BreweryNew} />

                        <Route exact path="/countries" component={CountryList} />
                        <Route path="/countries/new" component={CountryNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
