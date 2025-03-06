import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookItemByISBN, getReviewsForBook, addReview, likeReview, deleteReview } from "../services/BookService";

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

const BookReviews: React.FC = () => {
  const { isbn } = useParams<{ isbn?: string }>(); // Hanterar undefined
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookTitle, setBookTitle] = useState<string>(""); // För att visa boktitel
  const [newReview, setNewReview] = useState({ rating: 5, review_text: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isbn) return;

    const fetchBookData = async () => {
      try {
        const response = await getBookItemByISBN(isbn, token);
        setBookTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching book item:", error);
      }
    };

    fetchBookData();
    fetchReviews();
  }, [isbn]);

  const fetchReviews = async () => {
    if (!isbn) return;
    try {
      const response = await getReviewsForBook(isbn);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isbn) return;
    try {
      await addReview(isbn, newReview.rating, newReview.review_text, token);
      setNewReview({ rating: 5, review_text: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleLikeReview = async (reviewId: number) => {
    try {
      await likeReview(reviewId, token);
      fetchReviews();
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId, token);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2 className="title is-4">Recensioner för "{bookTitle}"</h2>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="box">
            <p><strong>{review.username}</strong> ({review.rating} ⭐)</p>
            <p>{review.review_text}</p>
            <p className="is-size-7 has-text-grey">{new Date(review.created_at).toLocaleString()}</p>
            <button 
              className="button is-small is-primary"
              onClick={() => handleLikeReview(review.id)}
            >
              ❤️ {review.likes}
            </button>
            {token && (
              <button
                className="button is-small is-danger ml-2"
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
