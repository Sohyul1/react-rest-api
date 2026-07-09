import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const persistSession = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
    };

    const clearSession = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    // credentials: { email, password }
    const login = async (credentials, e) => {
        e?.preventDefault();
        try {
            const response = await axiosClient.post("auth/login", credentials);
            persistSession(response.data);
            navigate("/bookings");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else if (error.response?.status === 401) {
                setErrors({ email: [error.response.data.message || "Invalid credentials."] });
            }
        }
    };

    // form: { name, email, password, password_confirmation }
    const register = async (form, e) => {
        e?.preventDefault();
        try {
            const response = await axiosClient.post("auth/register", form);
            persistSession(response.data);
            navigate("/bookings");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const logout = async () => {
        try {
            await axiosClient.post("auth/logout");
        } catch (error) {
            // Token may already be invalid/expired — clear the session locally regardless.
        } finally {
            clearSession();
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                register,
                logout,
                errors,
                setErrors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
