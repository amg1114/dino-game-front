import { Outlet } from "react-router-dom"
import { FormularioFiltros } from "../../../partials/FormularioFiltros/FormularioFiltros"
import { useState, useEffect } from "react"
import axios from "axios"
import { GameCard } from "../../../components/GameCard/GameCard"
import "./PaginaJuegos.css"
import Swal from "sweetalert2"
export function PaginaJuegos() {

    const ENDPOINT = process.env.REACT_APP_API + "/video-games";
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        loadGames();
    }, []);

    const loadGames = (params = {}) => {
        axios.get(ENDPOINT, { params })
            .then((respuesta) => {
                setJuegos(respuesta.data)
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            })

    };

    const Search = (data) => {
        const params = {}
        if (data.search) params.search = data.search
        if (data.categoria) params.categoria = data.categoria.id
        if (data.precio) params.precio = data.precio
        loadGames(params)
    };

    return (
        <div className="container">
            <FormularioFiltros onSearch={Search} />
            {
                juegos === null ? <><h1>Game was not found</h1></> : (
                    <div className="lista-juegos">
                        {juegos.map((juego, index) => (
                            <GameCard key={index} Game={juego} />
                        ))}
                    </div>
                )
            }
            <Outlet />
        </div>
    );
}
