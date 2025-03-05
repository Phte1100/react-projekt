import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookItemById } from "../services/BookService";

interface BookItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Hämta ID från URL
  const [bookItem, setBookItem] = useState<BookItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBookItem = async () => {
      try {
        const response = await getBookItemById(id);
        setBookItem(response.data);
      } catch (error) {
        console.error("Error fetching book item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookItem();
  }, [id]);

  if (loading) return <p className="loading">Hämtar data...</p>;
  if (!bookItem) return <p>Menyalternativet kunde inte hittas.</p>;

  return (
      <>
        <h2 className="title is-2">{bookItem.name}</h2>
          <div className="content">
            <p><strong>Beskrivning:</strong> {bookItem.description || "Ingen beskrivning"}</p>
            <p><strong>Pris:</strong> {bookItem.price} kr</p>
            <p><strong>Kategori:</strong> {bookItem.category || "Okänd kategori"}</p>
          </div>
      </>
  );
};

export default DetailPage;
