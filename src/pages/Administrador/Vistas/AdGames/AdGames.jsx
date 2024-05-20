import axios from "axios"
import { useEffect, useState } from "react"
import { GameCard } from "../../../../components/GameCard/GameCard"
import { FormularioFiltros } from "../../../../partials/FormularioFiltros/FormularioFiltros"
import './AdGames.css'
import { Outlet } from "react-router-dom"

export function AdGames() {
    const ENDPOINT = process.env.REACT_APP_API + "/video-games";
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        loadGames();
    }, []);

    const loadGames = (params = {}) => {
        axios.get(ENDPOINT, { params })
            .catch((error) => {
                error.code === "ERR_BAD_REQUEST" ? setJuegos(null):console.log(error)         
            })
            .then((respuesta) => {
                setJuegos(respuesta.data)
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
        <div className="container container-admin">
            <h2><span>ADMINISTRAR </span>JUEGOS</h2>
            <FormularioFiltros onSearch={Search} />
            {
                juegos === null ? <><h1>Game was not found</h1></> : (
                    <div className="lista-juegos-admin">
                        {juegos.map((juego, index) => (
                            <GameCard key={index} Game={juego} />
                        ))}
                    </div>
                )
            }
            <Outlet/>
        </div>
    );
}