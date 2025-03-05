import React, { useState, useEffect } from "react";
import { getAllBookItems, deleteBookItem, likeBookItem } from "../services/BookService";
import Modal from "./Modal";
import EditBookItem from "./EditBookItem";

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
  likes: number;
}

const BookListLoggedIn: React.FC = () => {
  const [bookItems, setBookItems] = useState<BookItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getAllBookItems();
      setBookItems(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

    const handleDelete = async (isbn: string) => {
      try {
        if (!token) {
          console.error("Unauthorized: No token found.");
          return;
        }
        await deleteBookItem(isbn, token); // Skickar token
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    };
    
    const handleLike = async (isbn: string) => {
      try {
        if (!token) {
          console.error("Unauthorized: No token found.");
          return;
        }
        await likeBookItem(isbn, token); // Skickar token
        fetchBooks();
      } catch (error) {
        console.error("Error liking book:", error);
      }
    };
  

  return (
    <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Bild</th>
            <th>Titel</th>
            <th>Författare</th>
            <th>Utgivningsår</th>
            <th>Genre</th>
            <th>Format</th>
            <th>Gilla</th>
            {token && <th>Redigera/radera</th>}
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
                <button className="button is-small is-primary" onClick={() => handleLike(item.isbn)}>
                  ❤️ {item.likes}
                </button>
              </td>
              {token && (
                <td>
                  <button
                    className="button is-small is-info"
                    onClick={() => {
                      setSelectedItemId(item.isbn);
                      setIsModalOpen(true);
                    }}
                  >
                    Redigera
                  </button>
                  <button className="button is-small is-danger ml-2" onClick={() => handleDelete(item.isbn)}>
                    Radera
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <EditBookItem
            bookItemId={selectedItemId} // Rätt namn matchar EditBookItemProps
            onClose={() => setIsModalOpen(false)}
            refreshBook={fetchBooks}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookListLoggedIn;
