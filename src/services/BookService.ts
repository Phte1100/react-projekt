import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

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

interface NewBookItem {
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
  axios.put<BookItem>(`${API_URL}/${isbn}`, bookItem, {
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

export { 
  getAllBookItems, 
  getBookItemByISBN, 
  createBookItem, 
  updateBookItem, 
  deleteBookItem, 
  likeBookItem 
};
