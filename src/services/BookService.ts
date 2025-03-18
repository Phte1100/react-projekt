import axios from "axios";

const API_URL = "https://react-backend-t6ht.onrender.com";

interface BookItem {
  published_year: number;
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
  userHasLiked: boolean
}

// Hämta alla böcker
const getAllBookItems = () => axios.get<BookItem[]>(`${API_URL}/books`);

// Hämta en bok via ISBN
const getBookItemByISBN = (isbn: string, token: string | null) =>
  axios.get<BookItem>(`${API_URL}/books/${isbn}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}, // Skicka token om den finns
  });

// Skapa en ny bok (kräver autentisering)
const createBookItem = (bookItem: { isbn: string; format: string }, token: string | null) =>
  axios.post(`${API_URL}/books`, bookItem, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"  
    },
  });


// Uppdatera en bok (kräver autentisering)
const updateBookItem = (isbn: string, bookItem: Partial<BookItem>, token: string | null) =>
  axios.put<BookItem>(`${API_URL}/books/${isbn}`, bookItem, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Radera en bok (kräver autentisering)
const deleteBookItem = (isbn: string, token: string | null) =>
  axios.delete(`${API_URL}/books/${isbn}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Gilla en bok (kräver autentisering)
const likeBookItem = (isbn: string, token: string | null) =>
  axios.post(`${API_URL}/books/${isbn}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Hämta recensioner för en bok
const getReviewsForBook = (isbn: string) =>
  axios.get(`${API_URL}/books/${isbn}/reviews`);

// Skapa en ny recension (kräver autentisering)
const addReview = (isbn: string, rating: number, review_text: string, token: string | null, userId: number) => {

  return axios.post(
    `${API_URL}/books/${isbn}/reviews`,
    { user_id: userId, rating, review_text }, // Skicka `user_id`
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateReview = (reviewId: number, rating: number, review_text: string, token: string | null, userId: number) => {
  return axios.put(
    `${API_URL}/reviews/${reviewId}`,
    { user_id: userId, rating, review_text },
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// Radera en recension (kräver autentisering)
const deleteReview = (reviewId: number, token: string | null, userId: number) =>
  axios.delete(`${API_URL}/reviews/${reviewId}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    data: { user_id: userId } // Skicka user_id i request-body
  });

export { 
  updateReview,
  getAllBookItems, 
  getBookItemByISBN, 
  createBookItem, 
  updateBookItem, 
  deleteBookItem, 
  likeBookItem,
  getReviewsForBook,
  addReview,
  deleteReview
};
