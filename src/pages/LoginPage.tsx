import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Valideringsschema
const schema = yup.object().shape({
  username: yup.string().min(4, "Användarnamn måste vara minst 4 tecken").required("Användarnamn är obligatoriskt"),
  password: yup.string().min(6, "Lösenord måste vara minst 6 tecken och innehålla en siffra och ett specialtecken")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, "Lösenordet måste innehålla minst en siffra och ett specialtecken")
    .required("Lösenord är obligatoriskt"),
});

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Kolla om användaren redan är inloggad
  useEffect(() => {
    if (user) {
      navigate("/Cms");
    }
  }, [user, navigate]);

  // Hantera inloggning
  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await login(data);
      toast.success("Inloggning lyckades! Du skickas vidare...");
      navigate("/Cms");
    } catch (err) {
      toast.error("Inloggningen misslyckades. Kontrollera dina uppgifter.");
    }
  };

  return (
    <>
      <div>
        <h1 className="title is-1">Logga in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="box">
          <div className="field">
            <label className="label">Användarnamn</label>
            <div className="control">
              <input
                {...register("username")}
                className="input"
                type="text"
                placeholder="Skriv in ditt användarnamn"
              />
            </div>
            <p className="has-text-danger">{errors.username?.message}</p>
          </div>

          <div className="field">
            <label className="label">Lösenord</label>
            <div className="control">
              <input
                {...register("password")}
                className="input"
                type="password"
                placeholder="Skriv in ditt lösenord"
              />
            </div>
            <p className="has-text-danger">{errors.password?.message}</p>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Logga in
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
