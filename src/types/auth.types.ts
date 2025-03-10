export interface User {
    id: string,
    email: string,
    username: string,
    role: "admin" | "editor" | "user";
}

export interface LoginCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    user: User,
    token: string
}

export interface AuthContextType {
    user: User | null,
    token: string | null,
    login: (credentials: LoginCredentials) => Promise<void>,
    logout: () => void
}