import React from "react";
import { useNavigate } from "react-router-dom";
import { createBookItem } from "../services/BookService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Valideringsschema
const schema = yup.object().shape({ // Skapa ett valideringsschema med Yup
  isbn: yup
    .string()
    .matches(/^\d+$/, "Endast siffror tillåtna")
    .min(10, "ISBN måste vara minst 10 siffror")
    .max(13, "ISBN får vara max 13 siffror")
    .required("ISBN är obligatoriskt"),
  format: yup.string().required("Format måste väljas"),
});

const AddBookItem: React.FC = () => { 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { // React Hook Form
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Hantera formulärskickning
  const onSubmit = async (data: { isbn: string; format: string }) => {
    try {
      await createBookItem(data, token);
      toast.success("Bok tillagd!");
      navigate("/cms");
    } catch (error) {
      toast.error("Misslyckades med att lägga till boken");
      console.error("Error creating book item:", error);
    }
  };

  return (
    <div>
      <h2 className="title is-4">Lägg till en ny bok</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">ISBN</label>
          <div className="control">
            <input
              type="text"
              className="input"
              {...register("isbn")}
              placeholder="Ange ISBN (endast siffror)"
            />
          </div>
          <p className="has-text-danger">{errors.isbn?.message}</p>
        </div>

        <div className="field">
          <label className="label">Format</label>
          <div className="control">
            <div className="select">
              <select {...register("format")}>
                <option value="hardcover">Inbunden</option>
                <option value="paperback">Pocket</option>
                <option value="ebook">E-bok</option>
              </select>
            </div>
          </div>
          <p className="has-text-danger">{errors.format?.message}</p>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary is-fullwidth">
              Lägg till boken
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookItem;
