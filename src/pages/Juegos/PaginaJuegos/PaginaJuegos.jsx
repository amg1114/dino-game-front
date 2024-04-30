import { Outlet } from "react-router-dom";
import { FormularioFiltros } from "../../../partials/FormularioFiltros/FormularioFiltros";
import { useEffect, useState } from "react";
import axios from "axios";
import { GameCard } from "../../../components/GameCard/GameCard";

// juegos 
// juegos/1
export function PaginaJuegos() {
    const ENDPOINT = process.env.REACT_APP_API + "/video-games"
    const [juegos, setJuegos] = useState([])

    useEffect(() => {
        axios.get(ENDPOINT)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setJuegos(respuesta.data)
            })
    })

    return <>
        {juegos === null ? <></> : (
            <div>
                <FormularioFiltros onSearch={(data) => console.log({ data })} />
                <div className="lista-juegos">
                    {
                        juegos.map((juego, index) => {
                            <div className="juego" key={index}>
                                <GameCard
                                    image={juego.assets[0].url}
                                    title={juego.titulo}
                                    description={juego.description}
                                    url={"/video-game/" + juego.id}
                                />
                            </div>
                        })
                    }
                </div>
                <Outlet />
            </div>
        )
        }
    </>
}