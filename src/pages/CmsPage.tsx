import { useAuth } from '../context/AuthContext';
import MenuListLoggedIn from "../components/BookListLoggedIn";
import AddMenuItem from '../components/AddBookItem';

const CmsPage = () => {

  const { user } = useAuth();


  return (
    <>
      <h1 className="title is-1">Hej, {user ? `${user.username}` : ""}</h1>
      <AddMenuItem />
      <MenuListLoggedIn />
    </>
  );
}

export default CmsPage;
