import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CmsPage from "./pages/CmsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailPage from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage.tsx";

const router = createBrowserRouter([ // Skapa en router med de olika sidorna
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/Cms", // Skapa en skyddad route för CmsPage, endast för admin och editor
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
                element: ( // Skapa en skyddad route för UserPage, endast för admin
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <UserPage />
                  </ProtectedRoute>
                ),
            }
        ]
    }
]);

export default router;