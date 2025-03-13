import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps { 
    children: ReactNode;
    requiredRoles?: string[]; // Roller som krävs för att få åtkomst
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Skickar tillbaka till startsidan om rollen inte är godkänd
    }

    return <>{children}</>;
};

export default ProtectedRoute;
