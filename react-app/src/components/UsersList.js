import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li className='user-list-listitem' key={user.id}>
        <NavLink to={`/users/${user.id}`}>{`u/${user.username}`}</NavLink>
      </li>
    );
  });

  return (
    <>
      <div className='user-list-header-container'>
        <h1>User List</h1>
      </div>
      <ul className='user-list-ul'>{userComponents}</ul>
    </>
  );
}

export default UsersList;
