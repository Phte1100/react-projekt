import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

// Hämta alla användare (kräver admin-token)
const getUsers = (token: string | null) =>
  axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Uppdatera en användare
const updateUser = (user: { id: number; username: string; email: string; role: string }, token: string | null) =>
  axios.put(`${API_URL}/users/${user.id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Radera en användare
const deleteUser = (userId: number, token: string | null) =>
  axios.delete(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export { getUsers, updateUser, deleteUser };
