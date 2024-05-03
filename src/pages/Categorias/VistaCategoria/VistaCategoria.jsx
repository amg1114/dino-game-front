import axios from "axios"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { GameCard } from "../../../components/GameCard/GameCard"
import './VistaCategoria.css'




export function VistaCategoria() {
    const { id } = useParams()
    const ENDPOINT_API = process.env.REACT_APP_API + "/categorias/" + id
    const [categoria, setCategoria] = useState({})
    const [juego, setJuego] = useState([])

    useEffect(() => {
        axios.get(ENDPOINT_API)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setCategoria(respuesta.data)
                setJuego(respuesta.data.videoGames)
            })

    })


    return <>
        {categoria === null ? <></> : (
            <div className="seccion">
                <h2 className="tituloCategoria">{categoria.titulo}</h2>
                <div className="listaSeccion">
                    {juego.map((elemento, index) => {
                        return (
                            <div key={index} className="juegosCard">
                                <GameCard
                                    image={elemento.assets[0].url}
                                    title={elemento.titulo}
                                    description={"#"}
                                    url={"/juegos/" + elemento.id}
                                />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
        }
    </>
}
