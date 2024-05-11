import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

function AuthProvider({ child }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    const contextValue = useMemo(() => {
        return {
            token,
            updateToken,
        };
    }, [token]);

    return <AuthContext.Provider value={contextValue}>{child}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;
