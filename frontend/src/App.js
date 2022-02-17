import React, { useState, useEffect } from "react";
import "./App.scss";
import moment from 'moment';
import EditLogo from './edit.svg';
import DeleteLogo from './delete.svg';

import {
  fetchUsers,
  postUser,
  putUser,
  deleteUser,
  deleteUsers,
} from './utils';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [deleteMode, setDeleteMode] = useState(null);
  const timestamp = new Date();

  useEffect(() => {
    async function fetchUsersApi() {
      const data = await fetchUsers();
      setUsers(data);
    }

    fetchUsersApi();
  }, []);

  const handleAddUser = () => {
    const newUser = {id: 'add_new', user_name: '', email: '', data: moment(timestamp).format('L')};
    const userWithAddNewId = users.find(user => user.id === 'add_new');
    if (userWithAddNewId) return;

    setEditedUser(newUser);
    setUsers(users.concat(newUser));
  };

  const deleteUserConfirm = async (user_name) => {
    await deleteUser(user_name);
    const updatedUsers = Object.assign([], users);
    const filteredUsers = updatedUsers.filter(user => user.user_name !== user_name);
    setUsers(filteredUsers);
  };

  const deleteAll = async () => {
    await deleteUsers();
    setUsers([]);
  };

  const handleEditUser = (user) => {
    setEditedUser(editedUser && user?.id === editedUser?.id ? null : user);
  };

  const handleDeleteToggle = (user) => setDeleteMode(user);

  const handleEditUserField = e => {
    const { name, value } = e.target;

    setEditedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    const updatedUsers = Object.assign([], users);

    if (editedUser.id === 'add_new') {
      const data = await postUser(editedUser);
      const index = users.findIndex(user => user.id === 'add_new');
      updatedUsers[index] = data;
    } else {
      const oldUserName = users.find(user => user.id === editedUser.id).user_name;
      const data = await putUser(oldUserName, editedUser);
      const index = users.findIndex(user => user.id === data.id);
      updatedUsers[index] = data;
      setEditedUser(null);
    }
    setUsers(updatedUsers);
  };

  const renderUsers = () => (
    <React.Fragment>
      {users.map((user) => {
        const { id, user_name, email, data } = user;
        const editMode = editedUser && editedUser.id === user.id;
        const deleteMod = deleteMode && deleteMode.id === user.id;

        return (
          <div key={id} className="row">
            <div className="col">
              {editMode ? <input name="user_name" value={editedUser.user_name} onChange={handleEditUserField} /> : user_name}
            </div>
            <div className="col">
              {editMode ? <input name="email" value={editedUser.email} onChange={handleEditUserField} /> : email}
            </div>
            <div className="col">
              {data}
            </div>
            <div className="cols">
              <button className="edit-button" onClick={() => handleEditUser(user)}><img className="logo" src={EditLogo} /></button>
              <button className="delete-button"  onClick={() => handleDeleteToggle(user)}><img className="logo" src={DeleteLogo} /></button>
              {deleteMod ? <button className="confirm-button" onClick={() => deleteUserConfirm(user.user_name)}>Confirm</button> : null}
              {editMode ? <button className="save-button" onClick={saveUser}>Save</button> : null}
            </div>
          </div>
        )
      })}
    </React.Fragment>
  );

  return (
    <div>
      <div id="todo-list">
        <div className="header">
          <button onClick={handleAddUser} className="button">Add Row</button>
          <button onClick={deleteAll} className="button">Remove All</button>
        </div>
        <div className="table">
          <div className="row table-header">
            <div className="col name">Name</div>
            <div className="col email">Email</div>
            <div className="col data">Data</div>
          </div>
          {renderUsers()}
        </div>
      </div>
    </div>
  );
};

export default App;