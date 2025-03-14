import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //Importera ToastContainer
import "react-toastify/dist/ReactToastify.css"; //Importera toast-stilar

const Layout = () => { 
    return (
      <div className="is-flex is-flex-direction-column" style={{ minHeight: "100vh" }}>
        <Header />
        <main className="is-flex-grow-1">
          <div className="container is-fluid">
            <Outlet />
          </div>
        </main>
        
        {/* Lägg ToastContainer här så att den alltid finns på sidan */}
        <ToastContainer position="top-right" autoClose={3000} />

        <footer className="footer">
          <div className="content has-text-centered">
            <p>&copy; 2025, phte1100, Philip Telberg</p>
          </div>
        </footer>
      </div>
    );
}

export default Layout;
