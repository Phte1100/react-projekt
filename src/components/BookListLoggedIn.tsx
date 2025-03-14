import React, { useState, useEffect } from "react";
import { getAllBookItems, deleteBookItem, likeBookItem } from "../services/BookService";
import Modal from "./Modal";
import EditBookItem from "./EditBookItem";
import { toast } from "react-toastify";

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
  userHasLiked: boolean;
}

const BookListLoggedIn: React.FC = () => {
  const [bookItems, setBookItems] = useState<BookItem[]>([]); // Skapar en state för bokobjekten
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // Skapar en state för vald bok
  const [isModalOpen, setIsModalOpen] = useState(false); // Skapar en state för att visa modal

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getAllBookItems();
  
      // Se till att varje bok innehåller userHasLiked
      const booksWithLikes = response.data.map((book) => ({
        ...book,
        userHasLiked: book.userHasLiked ?? false, // Sätter till false om det saknas
      }));
  
      setBookItems(booksWithLikes);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (isbn: string) => { // Funktion för att radera bok
    try {
      if (!token) {
        console.error("Unauthorized: No token found.");
        return;
      }

      await deleteBookItem(isbn, token); 
      toast.success("Boken har raderats!"); //Visa bekräftelse
      fetchBooks();
    } catch (error) {
      toast.error("Kunde inte radera boken."); //Visa felmeddelande
      console.error("Error deleting book:", error);
    }
  };

  const handleLike = async (isbn: string) => { // Funktion för att gilla en bok
    try {
      if (!token) {
        console.error("Unauthorized: No token found.");
        return;
      }
  
      await likeBookItem(isbn, token);
      fetchBooks();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleUpdateSuccess = () => { // Funktion för att uppdatera boklistan efter PUT
    fetchBooks();
  };

  return (
    <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Bild</th>
            <th>Titel</th>
            <th>Författare</th>
            <th>ISBN</th>
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
              <td>{item.isbn}</td>
              <td>{item.publishedYear}</td>
              <td>{item.genre}</td>
              <td>{item.format}</td>
              <td>
                <button
                  className={`button is-small ${item.userHasLiked ? "is-danger" : "is-primary"}`}
                  onClick={() => handleLike(item.isbn)}
                >
                  {item.userHasLiked ? "💔 Ta bort gilla" : "❤️ Gilla"} {item.likes}
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

      {token && selectedItemId && ( //Visa modal om användaren är inloggad och en bok är vald
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItemId(null);
          }}
        >
          <EditBookItem
            bookItemId={selectedItemId}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedItemId(null);
            }}
            refreshBook={handleUpdateSuccess} //Notis vid PUT
          />
        </Modal>
      )}
    </div>
  );
};

export default BookListLoggedIn;
