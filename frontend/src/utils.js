const BASE_URL = 'http://localhost:4000';

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/user/users`);
    return await res.json();
  } catch (e) {
    console.error('Failed to fetchUsers, e: ', e);
    return [];
  }
};

export const postUser = async (data) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${BASE_URL}/api/user`, options);
    return await res.json();
  } catch (e) {
    console.error('Failed to postUser, e: ', e);
  }
};

export const putUser = async (userName, data) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${BASE_URL}/api/user/${userName}`, options);
    return await res.json();
  } catch (e) {
    console.error('Failed to putUser, e: ', e);
  }
};

export const deleteUser = async (userName) => {
  return await fetch(`${BASE_URL}/api/user/${userName}`, { method: 'DELETE' });
};

export const deleteUsers = async () => {
  return await fetch(`${BASE_URL}/api/user/users`, { method: 'DELETE' });
};
