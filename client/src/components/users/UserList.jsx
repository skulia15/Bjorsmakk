import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import style from "../ListView.module.scss";

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
			<div className="" key={user._id}>
				<div className="">{user.name}</div>
				<div className="">{user.email}</div>
        {/* <img src={user.image} alt=""/> */}
			</div>
		  );
    });
  }
  render() {
    return (
      <div className={style.listView}>
        <div className={style.listViewContainer}>
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