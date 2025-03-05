import React, { useState, useEffect } from "react";
import { getAllBookItems } from "../services/BookService";
import { NavLink } from "react-router-dom";

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

const BookList: React.FC = () => {
  const [bookItems, setBookItems] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await getAllBookItems();
      setBookItems(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title">Tillgängliga Böcker</h2>

      {loading ? (
        <p className="loading">Hämtar data...</p>
      ) : (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Bild</th>
              <th>Titel</th>
              <th>Författare</th>
              <th>Utgivningsår</th>
              <th>Genre</th>
              <th>Format</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {bookItems.map((item) => (
              <tr key={item.isbn}>
                <td>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} style={{ width: "50px" }} />
                  ) : (
                    "Ingen bild"
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publishedYear}</td>
                <td>{item.genre}</td>
                <td>{item.format}</td>
                <td>
                  <NavLink to={`/book/${item.isbn}`} className="button is-info">
                    Mer information
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BookList;
