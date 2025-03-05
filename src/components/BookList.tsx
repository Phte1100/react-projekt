import React, { useState, useEffect } from "react";
import { getAllBookItems } from "../services/BookService";
import { NavLink } from "react-router-dom";

interface BookItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
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
      console.error("Error fetching Book items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title">Meny</h2>

      {loading ? (
        <p className="loading">Hämtar data...</p>
      ) : (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Pris</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price} kr</td>
                <td>
                  {/* Länk till DetailPage för att visa enskild meny */}
                  <NavLink to={`/book/${item._id}`} className="button is-info">
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
