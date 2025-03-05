import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => { // Layout för sidan
    return (
      <>
      <Header />
      <main>
        <div className="text-container">
        <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
        <p>&copy; 2025, phte1100, Philip Telberg</p>
        </div>
        </footer>
      </>
    );
  }
  
  export default Layout;