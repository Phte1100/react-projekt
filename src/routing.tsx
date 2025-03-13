import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CmsPage from "./pages/CmsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailPage from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage.tsx";

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
                <ProtectedRoute requiredRoles={["admin", "editor"]}>
                <CmsPage />
                </ProtectedRoute>
            )
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/book/:isbn",
                element: <DetailPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/users",
                element: (
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <UserPage />
                  </ProtectedRoute>
                ),
            }
        ]
    }
]);

export default router;