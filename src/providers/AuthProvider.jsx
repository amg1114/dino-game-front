import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

function AuthProvider({ child }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [usuario, setUsuario] = useState(null);
    const [biblioteca, setBiblioteca] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    const deleteToken = () => {
        setToken(null);
    }

    const getUsuario = () => {
        axios.get(process.env.REACT_APP_API + "/auth/profile")
            .then((response) => {
                setUsuario(response.data)
                setIsLoading(false);
                getBiblioteca()
            })
            .catch(function (error) {
                setIsLoading(false);
            })
    }

    const getBiblioteca = () => {
        axios.get(process.env.REACT_APP_API + "/video-games/biblioteca")
            .then((response) => {
                setBiblioteca(response.data)
            })
            .catch(function (error) {
                setBiblioteca([])
            })
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            getUsuario();
      //      getBiblioteca();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setUsuario(null);
        }
    }, [token]);

    const contextValue = useMemo(() => {
        return {
            token, 
            usuario,
            biblioteca,
            isLoading,
            updateToken,
            deleteToken
        };
    }, [token, isLoading, usuario, biblioteca]);

    return <AuthContext.Provider value={contextValue}>{child}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;
