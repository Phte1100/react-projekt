import React, { useState, useEffect } from "react";
import { getBookItemByISBN, updateBookItem } from "../services/BookService";

interface BookItem {
  isbn: string;
  title: string;
  author: string;
  publishedYear: number;
  description?: string;
  excerpt?: string;
  thumbnail?: string;
  genre?: string;
  format?: string;
}

interface EditBookItemProps {
  bookItemId: string | null;
  onClose: () => void;
  refreshBook: () => void;
}

const EditBookItem: React.FC<EditBookItemProps> = ({ bookItemId, onClose, refreshBook }) => {
  const [bookItem, setBookItem] = useState<BookItem>({
    isbn: "",
    title: "",
    author: "",
    publishedYear: 0,
    description: "",
    excerpt: "",
    thumbnail: "",
    genre: "",
    format: "hardcover", // Default format
  });

  useEffect(() => {
    if (!bookItemId) return;
    fetchBookItem(bookItemId);
  }, [bookItemId]);

  const fetchBookItem = async (isbn: string) => {
    try {
      const response = await getBookItemByISBN(isbn);
      if (!response.data) {
        console.error("No data received from API!");
        return;
      }

      const bookData = response.data;

      setBookItem({
        isbn: bookData.isbn || "",
        title: bookData.title || "",
        author: bookData.author || "",
        publishedYear: bookData.publishedYear || 0,
        description: bookData.description || "",
        excerpt: bookData.excerpt || "",
        thumbnail: bookData.thumbnail || "",
        genre: bookData.genre || "",
        format: bookData.format || "hardcover", // Sätt default format om det saknas
      });
    } catch (error) {
      console.error("Error fetching book item:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookItem((prev) => ({
      ...prev,
      [name]: name === "publishedYear" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookItem.isbn) return;

    try {
      const token = localStorage.getItem("token");
      await updateBookItem(bookItem.isbn, bookItem, token);
      refreshBook();
      onClose();
    } catch (error) {
      console.error("Error updating book item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="title">Redigera Bok</h2>

      <div className="field">
        <label className="label">Titel</label>
        <div className="control">
          <input className="input" type="text" name="title" value={bookItem.title} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Författare</label>
        <div className="control">
          <input className="input" type="text" name="author" value={bookItem.author} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Utgivningsår</label>
        <div className="control">
          <input className="input" type="number" name="publishedYear" value={bookItem.publishedYear} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Genre</label>
        <div className="control">
          <input className="input" type="text" name="genre" value={bookItem.genre} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label className="label">Format</label>
        <div className="control">
          <select className="input" name="format" value={bookItem.format} onChange={handleChange}>
            <option value="hardcover">Inbunden</option>
            <option value="paperback">Pocket</option>
            <option value="ebook">E-bok</option>
          </select>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" type="submit">Spara ändring</button>
        </div>
        <div className="control">
          <button className="button is-light" type="button" onClick={onClose}>Avbryt</button>
        </div>
      </div>
    </form>
  );
};

export default EditBookItem;
