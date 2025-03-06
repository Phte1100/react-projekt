import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/BookService"; // Lägg till funktionen i BookService.ts

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Standardroll
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken långt.");
      return;
    }

    try {
      await registerUser(formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Omdirigera till login efter 2 sekunder
    } catch (err) {
      setError("Registrering misslyckades. Prova igen.");
    }
  };

  return (
    <>
      <h1 className="title is-1">Registrera</h1>
      
      {success && <p className="has-text-success">Användare skapad! Omdirigerar till inloggning...</p>}
      {error && <p className="has-text-danger">{error}</p>}
      
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Användarnamn</label>
          <div className="control">
            <input
              name="username"
              className="input"
              type="text"
              placeholder="Skriv ditt användarnamn"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">E-post</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="email"
              placeholder="Ange din e-post"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Lösenord</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Ange ett lösenord (minst 6 tecken)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Registrera
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
