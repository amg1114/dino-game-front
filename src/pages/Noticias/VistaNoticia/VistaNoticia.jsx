import axios from "axios"
import moment from 'moment';

import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import "./VistaNoticia.css"
import { ListaNoticia } from "../../../partials/ListaNoticia/ListaNoticia";
import { HomeListaNoticia } from "../../../partials/HomeListaNoticia/HomeListaNoticia";

export function VistaNoticia() {

    const { id } = useParams()
    const ENDPOINT = `https://dinogame.up.railway.app/api/noticias/${id}`
    const [noticia, setNoticia] = useState(null)
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        axios.get(ENDPOINT)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (response) {
                const noticia_data = response.data;
                axios.get(`https://dinogame.up.railway.app/api/noticias`)
                    .catch(function (error) {
                        console.log(error)
                    })
                    .then(function (response) {
                        setNoticias(response.data)
                        setNoticia(noticia_data);
                    })
            })
    })

    return <>
        {
            noticia === null ? <></> : (
                <div className="modal-fade animate__animated animate__fadeIn">
                    <div className="modal-content animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <Link to="/noticias" className="modal-closer">
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="container">
                            <div className="izquierda">
                                <h2>{noticia.titulo}</h2>
                                <img src={noticia.assets[0].url} alt={noticia.assets[0].titulo} className="imagen-juego" />
                                <p className="fecha">{moment(noticia.fecha, "YYY7-MM-DD").format("MMMM DD, YYYY")}</p>
                                <p>{noticia.descripcion}</p>
                            </div>
                            <div className="derecha">
                                <HomeListaNoticia notices={noticias} />
                     
                            </div>
                        </div>
                    </div>
                </div>)
        }
    </>
}