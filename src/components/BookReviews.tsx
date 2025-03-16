import React, { useState, useEffect } from "react";
import { getReviewsForBook, addReview, deleteReview, updateReview } from "../services/BookService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const token = localStorage.getItem("token");

  let userId: number | null = null;
  let userRole: string | null = null;

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userId = decodedToken.id;
      userRole = decodedToken.role;
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
      toast.error("Kunde inte hämta recensioner.");
    }
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isbn || !token || userId === null) return;

    try {
      if (editingReview) {
        await updateReview(editingReview.id, newReview.rating, newReview.review_text, token, userId);
        toast.success("Recension uppdaterad!");
        setEditingReview(null);
      } else {
        await addReview(isbn, newReview.rating, newReview.review_text, token, userId);
        toast.success("Recension tillagd!");
      }

      setNewReview({ rating: 5, review_text: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Misslyckades med att skicka recension.");
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!token || userId === null) return;

    try {
      await deleteReview(reviewId, token, userId);
      toast.success("Recension borttagen!");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Misslyckades med att ta bort recension.");
    }
  };

  const handleEditReview = (review: Review) => {
    setNewReview({ rating: review.rating, review_text: review.review_text });
    setEditingReview(review);
  };

  return (
    <div>
      <h2 className="title is-4">Recensioner</h2>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="box">
            <p><strong>{review.username}</strong> ({review.rating} ⭐)</p>
            <p>{review.review_text}</p>
            <p className="is-size-7 has-text-grey">
              {new Date(review.created_at).toLocaleString()} - Skriven av: <strong>{review.username}</strong>
            </p>

            {(userId === review.user_id || userRole === "admin") && (
              <button
                className="button is-small is-danger mr-2"
                onClick={() => handleDeleteReview(review.id)}
              >
                🗑 Ta bort
              </button>
            )}

            {userId === review.user_id && (
              <button
                className="button is-small is-warning"
                onClick={() => handleEditReview(review)}
              >
                ✏ Uppdatera
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Inga recensioner än.</p>
      )}

      {token && (
        <form onSubmit={handleReviewSubmit} className="box">
          <h3 className="title is-5">{editingReview ? "Uppdatera recension" : "Skriv en recension"}</h3>
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
              <button className="button is-primary" type="submit">
                {editingReview ? "Uppdatera" : "Skicka"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookReviews;
