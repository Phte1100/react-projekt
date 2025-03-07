import React, { useState, useEffect } from "react";
import { getReviewsForBook, addReview, deleteReview } from "../services/BookService";

interface Review {
  id: number;
  book_isbn: string;
  user_id: number;
  username: string;
  rating: number;
  review_text: string;
  likes: number;
  created_at: string;
}

interface BookReviewsProps {
  isbn: string;
}

const BookReviews: React.FC<BookReviewsProps> = ({ isbn }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, review_text: "" });
  const token = localStorage.getItem("token");

  // ✅ Hämta `user_id` från JWT-tokenet (om det finns)
  let userId: number | null = null;
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userId = decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    if (!isbn) return;
    fetchReviews();
  }, [isbn]);

  const fetchReviews = async () => {
    try {
      const response = await getReviewsForBook(isbn);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isbn || !token || userId === null) return; // Kontrollera att vi har en giltig användare

    try {
      console.log("Skickar recension till API:", { user_id: userId, book_isbn: isbn, rating: newReview.rating, review_text: newReview.review_text });
      
      await addReview(isbn, newReview.rating, newReview.review_text, token, userId);
      setNewReview({ rating: 5, review_text: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!token || userId === null) return;

    try {
      console.log("Försöker ta bort recension med ID:", reviewId);
      await deleteReview(reviewId, token, userId); // ✅ Skicka `userId` med anropet
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2 className="title is-4">Recensioner</h2>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="box">
            <p><strong>{review.username}</strong> ({review.rating} ⭐)</p>
            <p>{review.review_text}</p>
            <p className="is-size-7 has-text-grey">{new Date(review.created_at).toLocaleString()}</p>

            {/* ✅ Visa "Ta bort" endast om användaren skrev recensionen */}
            {userId === review.user_id && (
              <button 
                className="button is-small is-danger"
                onClick={() => handleDeleteReview(review.id)}
              >
                🗑 Ta bort
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Inga recensioner än.</p>
      )}

      {token && (
        <form onSubmit={handleReviewSubmit} className="box">
          <h3 className="title is-5">Skriv en recension</h3>
          <div className="field">
            <label className="label">Betyg</label>
            <div className="control">
              <input
                type="number"
                min="1"
                max="5"
                className="input"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Kommentar</label>
            <div className="control">
              <textarea
                className="textarea"
                value={newReview.review_text}
                onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                required
              ></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">Skicka</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};



export default BookReviews;
