import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBookItem } from "../services/BookService";

const AddBookItem: React.FC = () => {
  const [bookItem, setBookItem] = useState({
    isbn: "",
    title: "",
    author: "",
    publishedYear: 0,
    description: "",
    excerpt: "",
    thumbnail: "",
    genre: "",
    format: "hardcover", // Standardformat
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookItem((prev) => ({
      ...prev,
      [name]: name === "publishedYear" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    console.log("Skickar till API:", bookItem); // 🛠 Logga ut vad som skickas
  
    try {
      await createBookItem({ isbn: bookItem.isbn, format: bookItem.format }, token);
      console.log("Bok tillagd!");
      navigate("/");
    } catch (error) {
      console.error("Error creating book item:", error);
    }
  };
  

  return (
    <div>
      <h2 className="title is-4">Lägg till en ny bok</h2>
      <form onSubmit={handleSubmit}>

        <div className="field">
          <label className="label">ISBN</label>
          <div className="control">
            <input type="text" name="isbn" value={bookItem.isbn} onChange={handleChange} required className="input" />
          </div>
        </div>

        

        <div className="field">
          <label className="label">Format</label>
          <div className="control">
            <div className="select">
              <select name="format" value={bookItem.format} onChange={handleChange}>
                <option value="hardcover">Inbunden</option>
                <option value="paperback">Pocket</option>
                <option value="ebook">E-bok</option>
              </select>
            </div>
          </div>
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
