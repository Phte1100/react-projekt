import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

interface User { // Skapa en interface för användare
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

const UserPage: React.FC = () => { 
  const [users, setUsers] = useState<User[]>([]); // Skapa en state för användare
  const [editingUser, setEditingUser] = useState<User | null>(null); // Skapa en state för redigering av användare
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => { // Funktion för att hämta användare
    try {
      const response = await getUsers(token);
      setUsers(response.data);
    } catch (error) {
      toast.error("Kunde inte hämta användare.");
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId: number) => { // Funktion för att radera användare
    if (!token) return;
    try {
      await deleteUser(userId, token);
      fetchUsers();
      toast.success("Användare raderad!"); // Bekräftelse
    } catch (error) {
      toast.error("Kunde inte radera användaren.");
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user: User) => { // Funktion för att redigera användare
    setEditingUser(user);
  };

  const handleSaveEdit = async () => { // Funktion för att spara redigering av användare
    if (!editingUser || !token) return;
    try {
      await updateUser(editingUser, token);
      setEditingUser(null);
      fetchUsers();
      toast.success("Användarinformation uppdaterad!"); //Bekräftelse
    } catch (error) {
      toast.error("Kunde inte uppdatera användaren.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title has-text-centered mt-5">Användarhantering</h2>

      <div className="table-container">
        <table className="table is-fullwidth is-striped is-hoverable is-bordered">
          <thead className="has-background-light">
            <tr>
              <th>ID</th>
              <th>Användarnamn</th>
              <th>E-post</th>
              <th>Roll</th>
              <th>Skapad</th>
              <th className="has-text-centered">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`tag ${user.role === "admin" ? "is-danger" : user.role === "editor" ? "is-warning" : "is-info"}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="has-text-centered">
                  <button className="button is-small is-info mr-2" onClick={() => handleEdit(user)}>
                    Redigera
                  </button>
                  <button className="button is-small is-danger" onClick={() => handleDelete(user.id)}>
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="box mt-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h3 className="title is-5 has-text-centered">Redigera användare</h3>
          <div className="field">
            <label className="label">Användarnamn</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">E-post</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Roll</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="user">Användare</option>
                  <option value="editor">Redaktör</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-success" onClick={handleSaveEdit}>
                Spara
              </button>
            </div>
            <div className="control">
              <button className="button is-light" onClick={() => setEditingUser(null)}>
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;