import './VistaCategoria.css'

import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

import { GameCard } from "../../../components/GameCard/GameCard"




export function VistaCategoria() {
    const { id } = useParams()
    const ENDPOINT_API = process.env.REACT_APP_API + "/categorias/" + id
    const [categoria, setCategoria] = useState({})
    const [juego, setJuego] = useState([])

    useEffect(() => {
        axios.get(ENDPOINT_API)
            .then(function (respuesta) {
                setCategoria(respuesta.data)
                setJuego(respuesta.data.videoGames)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            })

    }, [])


    return <>
        {categoria === null ? <></> : (
            <div className="seccion">
                <h2 className="tituloCategoria">{categoria.titulo}</h2>
                <div className="listaSeccion">
                    {juego.map((elemento, index) => {
                        return (
                            <GameCard
                                key={index}
                                Game={elemento}
                            />
                        )
                    })
                    }
                </div>
            </div>
        )
        }
    </>
}
