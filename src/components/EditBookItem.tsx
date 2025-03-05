import React, { useState, useEffect } from "react";
import { getBookItemById, updateBookItem } from "../services/BookService";

interface BookItem { //interface för menyobjekt
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

interface EditBookItemProps { //interface för redigering av menyobjekt
  BookItemId: string | null;
  onClose: () => void;
  refreshBook: () => void;
}

const EditBookItem: React.FC<EditBookItemProps> = ({ BookItemId, onClose, refreshBook }) => {
  const [bookItem, setBookItem] = useState<BookItem>({ //state för menyobjekt
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => { //hämtar menyobjekt
    if (!bookItemId) return;
    fetchBookItem(bookItemId);
  }, [book]);

  const fetchBookItem = async (id: string) => { //funktion för att hämta menyobjekt
    try {
      const response = await getBookItemById(id);
      if (!response.data) {
        console.error("No data received from API!");
        return;
      }
      setBookItem(response.data);
    } catch (error) {
      console.error("Error fetching book item:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookItem((prev) => ({ //uppdaterar menyobjekt
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => { //skickar formulärdata till backend
    e.preventDefault();
    if (!bookItem._id) return;

    try {
      await updateBookItem(bookItem._id, bookItem);
      refreshBook();
      onClose();
    } catch (error) {
      console.error("Error updating book item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Namn</label>
        <div className="control">
          <input className="input" type="text" name="name" value={bookItem.name} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Beskrivning</label>
        <div className="control">
          <input className="input" type="text" name="description" value={bookItem.description} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label className="label">Pris</label>
        <div className="control">
          <input className="input" type="number" name="price" value={bookItem.price} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Kategori</label>
        <div className="control">
          <input className="input" type="text" name="category" value={bookItem.category} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">Spara ändring</button>
        </div>
      </div>
    </form>
  );
};

export default EditBookItem;
