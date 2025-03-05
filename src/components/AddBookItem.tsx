import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBookItem } from "../services/BookService";

const AddBookItem: React.FC = () => { //komponent för att lägga till menyobjekt
  const [bookItem, setBookItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookItem((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => { //skickar formulärdata till backend
    e.preventDefault();
    try {
      await createBookItem(bookItem, token);
      navigate("/");
    } catch (error) {
      console.error(" Error creating book item:", error);
    }
  };

  return ( //formulär för att lägga till menyobjekt
    <div>
<h2 className="title is-4">Lägg till i menyn</h2>
<form onSubmit={handleSubmit}>
  
  <div className="field">
    <label className="label">Namn</label>
    <div className="control">
      <input
        type="text"
        name="name"
        value={bookItem.name}
        placeholder="Namn på skapelsen"
        onChange={handleChange}
        required
        className="input"
      />
    </div>
  </div>

  <div className="field">
    <label className="label">Beskrivning</label>
    <div className="control">
      <input
        type="text"
        name="description"
        value={bookItem.description}
        placeholder="Beskrivning"
        onChange={handleChange}
        className="input"
      />
    </div>
  </div>

  <div className="field">
    <label className="label">Pris</label>
    <div className="control">
      <input
        type="number"
        name="price"
        value={bookItem.price}
        onChange={handleChange}
        required
        className="input"
      />
    </div>
  </div>

  <div className="field">
    <label className="label">Kategori</label>
    <div className="control">
      <input
        type="text"
        name="category"
        value={bookItem.category}
        placeholder="Kategori"
        onChange={handleChange}
        className="input"
      />
    </div>
  </div>

  <div className="field">
    <div className="control">
      <button type="submit" className="button is-primary is-fullwidth">
        Lägg till
      </button>
    </div>
  </div>

</form>

    </div>
  );
};

export default AddBookItem;
