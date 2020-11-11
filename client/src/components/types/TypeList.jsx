import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTypes } from "../../actions";
import Button from "../button/Button";
import style from "../ListView.module.scss";
// import beerStyle from "./BeerListItem.module.scss";

class TypeList extends Component {
  componentDidMount() {
    this.props.fetchTypes();
  }
  renderTypes() {
    if (!this.props.types) {
      return <div>Engir bjórflokkar skráðir</div>;
    }
    return this.props.types.reverse().map((beerType) => {
      return (
        <div className="" key={beerType._id}>
            <span className="">{beerType.typeName}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
          <h1>Bjórflokkar</h1>
          <div className="">{this.renderTypes()}</div>
          <Link to={this.props.auth ? "/types/new" : "/"} className="btn">
            <Button
              buttonText="Skrá Bjórflokk"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, types }) {
  return { auth, types };
}

export default connect(mapStateToProps, { fetchTypes })(TypeList);
