import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../../actions";
import style from "./UserList.module.scss";
import listStyle from "../ListView.module.scss";

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
    return users.reverse().map((user) => {
      return (
        <div className={style.userItem} key={user._id}>
          <div className={style.userItemName}>{user.name}</div>
          <div>Netfang: {user.email}</div>
        </div>
      );
    });
  };
  
  return (
    <div className={listStyle.listView}>
      <div className={listStyle.listViewContainer}>
        <h1>Skráðir notendur</h1>
        <Users />
      </div>
    </div>
  );
};
