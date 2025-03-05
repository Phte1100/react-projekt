import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");  

  // Kontroll om användaren redan är inloggad
  useEffect(() => {
    if (user) {
      navigate("/Cms");
    }
  }, [user, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login attempt:", formData);

    try {
        await login({ username: formData.username, password: formData.password });
        navigate("/Cms");
    } catch (err) { 
        setError("Inloggningen misslyckades");
    }
  };

  return (
    <>
      <h1 className="title is-1">Logga in</h1>
      
      <form onSubmit={handleSubmit} className="box">
        {/* Felmeddelande visas om inloggning misslyckas */}
        {error && <p className="has-text-danger">{error}</p>}  

        <div className="field">
          <label className="label">Användarnamn</label>
          <div className="control">
            <input
              name="username"
              className="input"
              type="text"
              placeholder="Skriv in ditt användarnamn"
              value={formData.username}
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
              placeholder="Skriv in ditt lösenord"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Logga in
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
