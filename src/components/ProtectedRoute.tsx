import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps { 
    children: ReactNode;
}

const ProtectedRoute : React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => { //komponent för skyddade rutter
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
    <>{children}</>
    );
}

export default ProtectedRoute;