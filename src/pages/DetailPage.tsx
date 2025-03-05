import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookItemByISBN } from "../services/BookService";

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

const DetailPage: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>(); // Hämta ISBN från URL
  const [bookItem, setBookItem] = useState<BookItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isbn) return;

    const fetchBookItem = async () => {
      try {
        const response = await getBookItemByISBN(isbn);
        setBookItem(response.data);
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
    <>
      <h2 className="title is-2">{bookItem.title}</h2>
      <div className="content">
        {bookItem.thumbnail && (
          <img src={bookItem.thumbnail} alt={bookItem.title} style={{ maxWidth: "200px", marginBottom: "10px" }} />
        )}
        <p><strong>Författare:</strong> {bookItem.author || "Okänd"}</p>
        <p><strong>Utgivningsår:</strong> {bookItem.publishedYear}</p>
        <p><strong>Genre:</strong> {bookItem.genre || "Ingen genre"}</p>
        <p><strong>Format:</strong> {bookItem.format || "Okänt format"}</p>
        <p><strong>Beskrivning:</strong> {bookItem.description || "Ingen beskrivning"}</p>
        {bookItem.excerpt && (
          <p><strong>Utdrag:</strong> {bookItem.excerpt}</p>
        )}
      </div>
    </>
  );
};

export default DetailPage;
