import axios from "axios";

const API_URL = "https://react-backend-t6ht.onrender.com";

// Skapa en ny användare (registrering)
const registerUser = (userData: { username: string; email: string; password: string; role: string }) =>
  axios.post(`${API_URL}/users`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

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

export {registerUser, getUsers, updateUser, deleteUser };
