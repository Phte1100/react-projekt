import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/CmsPage";
import HomePage from "./pages/HomePage";
import BookList from "./components/BookList";
import DetailPage from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";

import "react-toastify/dist/ReactToastify.css";


function App() { // Lägg till routes för alla sidor
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<BookList />} />
        <Route path="/menu/:id" element={<DetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
