export interface User { // Skapa en interface för användare
    id: string,
    email: string,
    username: string,
    role: "admin" | "editor" | "user";
}

export interface LoginCredentials { // Skapa en interface för inloggningsuppgifter
    username: string,
    password: string
}

export interface AuthResponse { // Skapa en interface för autentiseringsrespons
    user: User,
    token: string
}

export interface AuthContextType { // Skapa en interface för autentiseringskontext
    user: User | null,
    token: string | null,
    login: (credentials: LoginCredentials) => Promise<void>,
    logout: () => void
}