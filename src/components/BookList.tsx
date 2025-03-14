import React, { useState, useEffect } from "react";
import { getAllBookItems, likeBookItem } from "../services/BookService";
import { NavLink, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Laddningsindikator

interface BookItem {
  isbn: string;
  title: string;
  author: string;
  publishedYear: number;
  description?: string;
  thumbnail?: string;
  genre?: string;
  format?: string;
  likes: number;
  averageRating?: number;
  userHasLiked: boolean;
}

const BookList: React.FC = () => {
  const [bookItems, setBookItems] = useState<BookItem[]>([]); // Skapar en state för bokobjekten
  const [filteredBooks, setFilteredBooks] = useState<BookItem[]>([]); // Skapar en state för filtrerade bokobjekt
  const [searchQuery, setSearchQuery] = useState(""); // Skapar en state för söksträng
  const [loading, setLoading] = useState(true); // Laddningsstatus
  const token = localStorage.getItem("token");// Hämta token från localStorage
  const navigate = useNavigate();

  useEffect(() => { // Hämta bokobjekten när komponenten laddas
    fetchBooks();
  }, []);

  const fetchBooks = async () => { // Funktion för att hämta bokobjekten
    try {
      setLoading(true); // Starta laddning
      const response = await getAllBookItems();
      setBookItems(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // Stäng av loading när API-anropet är klart
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredBooks(
      bookItems.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      )
    );
  };

  const handleLike = async (isbn: string) => {
    if (!token) {
      console.warn(" Ingen token – omdirigerar till login");
      navigate("/login");
      return;
    }

    try {
      await likeBookItem(isbn, token);
      fetchBooks(); // Uppdatera listan efter gilla
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Om laddning pågår, visa en spinner istället för listan
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <ClipLoader size={80} color={"#6c757d"} />
      </div>
    );
  }

  return (
    <div>
      {/* Sökfält */}
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Sök efter titel eller författare..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Boklistan */}
      <div className="columns is-multiline">
        {filteredBooks.map((item) => (
          <div key={item.isbn} className="column is-one-fifth">
            <div className="card hoverable" style={{ maxWidth: "300px", margin: "auto" }}>
              <div className="card-image">
                <figure className="image">
                  <NavLink to={`/book/${item.isbn}`}>
                    <img 
                      src={item.thumbnail ? item.thumbnail : "https://placehold.co/300x459"} 
                      alt={item.title} 
                    />
                  </NavLink>
                </figure>
              </div>

              <div className="card-content">
                <NavLink to={`/book/${item.isbn}`}>
                  <h2 className="title is-4">{item.title}</h2>
                  <h3 className="subtitle is-6">{item.author}</h3>
                  <p className="is-size-6 description-text">
                    {item.description
                      ? item.description.substring(0, 100) + "..."
                      : "Ingen beskrivning"}
                  </p>
                </NavLink>

                <div className="content">
                  <p><strong>ISBN:</strong> {item.isbn}</p>
                  <p><strong>Utgivningsår:</strong> {item.publishedYear || "Okänt"}</p>
                  <p><strong>Genre:</strong> {item.genre || "Ingen genre"}</p>
                  <p><strong>⭐ Betyg:</strong> {item.averageRating && item.averageRating > 0
                    ? Math.round(item.averageRating * 10) / 10 + " ⭐"
                    : "Saknar rating"}
                  </p>
                </div>

                {/* Like-knappen */}
                <button
                  className={`button is-small ${item.userHasLiked ? "is-danger" : "is-primary"}`}
                  onClick={() => handleLike(item.isbn)}
                >
                  {item.userHasLiked ? "💔 Ta bort gilla" : "❤️ Gilla"} {item.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
