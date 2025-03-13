import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookItemByISBN } from "../services/BookService";
import BookReviews from "../components/BookReviews"; // Lägg till recensioner

interface BookItem {
  isbn: string;
  title: string;
  author: string;
  publishedYear: number;
  published_year?: number;
  description?: string;
  excerpt?: string;
  thumbnail?: string;
  genre?: string;
  format?: string;
}

const DetailPage: React.FC = () => {
  const { isbn } = useParams<{ isbn?: string }>(); // Hanterar undefined
  const [bookItem, setBookItem] = useState<BookItem | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isbn) return;

    const fetchBookItem = async () => {
      try {
        const response = await getBookItemByISBN(isbn, token);
        const bookData = response.data;
    
        // 🔄 Mappa om `published_year` till `publishedYear`
        const mappedBook = {
          ...bookData,
          publishedYear: bookData.published_year ?? 0, 
        };
    
        setBookItem(mappedBook);
      } catch (error) {
        console.error("Error fetching book item:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBookItem();
  }, [isbn]);

  if (loading) return <p className="loading">Hämtar data...</p>;
  if (!bookItem) return <p>Boken kunde inte hittas.</p>;

  return (
<div className="container" style={{ maxWidth: "800px" }}>
      <div className="book-details">
        <h2 className="title has-text-centered">{bookItem.title}</h2>

        <div className="columns is-centered">
          <div className="column is-narrow">
            {bookItem.thumbnail ? (
              <img
                src={bookItem.thumbnail}
                alt={bookItem.title}
                className="book-thumbnail"
              />
            ) : (
              <p className="has-text-centered">Ingen bild tillgänglig</p>
            )}
          </div>

          <div className="column">
            <p><strong>Författare:</strong> {bookItem.author || "Okänd"}</p>
            <p><strong>Utgivningsår:</strong> {bookItem.publishedYear || "Okänt"}</p>
            <p><strong>Genre:</strong> {bookItem.genre || "Ingen genre"}</p>
            <p><strong>Format:</strong> {bookItem.format || "Okänt format"}</p>
          </div>
        </div>

        <div className="content">
          <p><strong>Beskrivning:</strong> {bookItem.description || "Ingen beskrivning"}</p>
        </div>
      </div>
      <br></br>
      {/* Lägger till recensioner */}
      <BookReviews isbn={isbn ?? ""} />
    </div>
  );
};

export default DetailPage;
