import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/BookService"; // Använd rätt tjänst
import { toast } from "react-toastify";

// Valideringsschema med Yup
const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Användarnamnet måste vara minst 4 tecken långt")
    .matches(/^[a-zA-Z0-9]+$/, "Användarnamnet får bara innehålla bokstäver och siffror")
    .required("Användarnamn är obligatoriskt"),
  email: yup.string().email("Ogiltig e-post").required("E-post är obligatoriskt"),
  password: yup
    .string()
    .min(6, "Lösenordet måste vara minst 6 tecken långt")
    .matches(/[0-9]/, "Lösenordet måste innehålla minst en siffra")
    .matches(/[!@#$%^&*]/, "Lösenordet måste innehålla minst ett specialtecken (!@#$%^&*)")
    .required("Lösenord är obligatoriskt"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Automatisk trimning av användarnamn vid input
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setValue("username", trimmedValue, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = { ...data, role: "user" }; // Lägg till en standardroll
      await registerUser(payload);
      toast.success("Användare skapad! Omdirigerar till inloggning...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registrering misslyckades:", error);
      toast.error("Registrering misslyckades. Försök igen.");
    }
  };
  

  return (
    <>
      <h1 className="title is-1">Registrera</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="box">
        <div className="field">
          <label className="label">Användarnamn</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Ange användarnamn"
              {...register("username")}
              onChange={handleUsernameChange} // Trimmar input automatiskt
            />
          </div>
          <p className="help is-danger">{errors.username?.message}</p>
        </div>

        <div className="field">
          <label className="label">E-post</label>
          <div className="control">
            <input className="input" type="email" placeholder="Ange din e-post" {...register("email")} />
          </div>
          <p className="help is-danger">{errors.email?.message}</p>
        </div>

        <div className="field">
          <label className="label">Lösenord</label>
          <div className="control">
            <input className="input" type="password" placeholder="Ange lösenord" {...register("password")} />
          </div>
          <p className="help is-danger">{errors.password?.message}</p>
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
