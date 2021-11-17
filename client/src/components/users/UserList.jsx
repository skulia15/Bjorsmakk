import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../../actions";
import userStyle from "./UserList.module.scss";
import listUserStyle from "../ListView.module.scss";

export const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const Users = () => {
    if (!users) {
      return <div>Sækir notendur...</div>;
    }
    console.log(users.sort(x => x.name));
    return users
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
      .map((user) => {
        return (
          <div className={userStyle.userItem} key={user._id}>
            <img className={userStyle.profilePicture} src={user.image} alt="user-img" width="32" height="32" />
            <div className={userStyle.nameAndEmailContainer} >
              <div className={userStyle.userItemName}>{user.name}</div>
              <div>Netfang: {user.email}</div>
            </div>
          </div>
        );
      });
  };

  return (
    <div className={`${listUserStyle.listViewContainer} ${listUserStyle.listViewContainer__narrow}`}>
      <div className={listUserStyle.listViewHeading}>
        <h1>Skráðir notendur</h1>
      </div>
      <Users />
    </div>
  );
};
