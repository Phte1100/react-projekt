import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CmsPage from "./pages/CmsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailPage from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/Cms",
                element: (
                <ProtectedRoute>
                <CmsPage />
                </ProtectedRoute>
            )
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/menu/:id",
                element: <DetailPage /> // Lägg till route för enskilda menyobjekt
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    }
]);

export default router;