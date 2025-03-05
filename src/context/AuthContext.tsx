import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// Skapa context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    // Funktion för att validera token
    const checkToken = async () => {
        const token = localStorage.getItem("token");
    
        console.log("Läser token från localStorage:", token);
    
        if (!token) {
            console.warn("Ingen token hittades!");
            return;
        }
    
        try {
            const res = await fetch("http://127.0.0.1:3000/validate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` //Skickar token i rätt format
                }
            });
    
            if (!res.ok) {
                const errorText = await res.text();
                console.error(`Fel vid validering: ${errorText}`); //Logga fel från backend
                throw new Error("Invalid token");
            }
    
            const data = await res.json();
            console.log("Token är giltig:", data.user); //Debug-logga
            setUser(data.user);
        } catch (error) {
            console.error("Token validation failed:", error);
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        }
    };
    

    // Kör `checkToken()` automatiskt vid sidladdning
    useEffect(() => {
        checkToken();
    }, [token]); // Körs när `token` ändras

    // Login-funktion
    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error("Inloggningen misslyckades");
            }

            const data: AuthResponse = await response.json();
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setToken(data.token);
        } catch (error) {
            throw error;
        }
    };

    // Logout-funktion
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook för att använda auth-context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
};
