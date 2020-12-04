import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import style from "./UserList.module.scss";
import listStyle from "../ListView.module.scss";

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  renderUsers() {
    if (!this.props.users) {
      return <div>Engir Notendur Skráðir</div>;
    }
    return this.props.users.reverse().map((user) => {
		return (
			<div className={style.userItem} key={user._id}>
				<div className={style.userItemName}>{user.name}</div>
				<div className="">Netfang: {user.email}</div>
        {/* <img src={user.image} alt=""/> */}
			</div>
		  );
    });
  }
  render() {
    return (
      <div className={listStyle.listView}>
        <div className={listStyle.listViewContainer}>
          <h1>Skráðir notendur</h1>
          <div className="">
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, users }) {
  return { auth, users };
}

export default connect(mapStateToProps, { fetchUsers })(UserList);