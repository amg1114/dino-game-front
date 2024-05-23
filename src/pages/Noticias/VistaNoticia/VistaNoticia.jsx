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
    const ENDPOINT = `${process.env.REACT_APP_API}/noticias/${id}`
    const [noticia, setNoticia] = useState(null)
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        axios.get(ENDPOINT)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (response) {
                const noticia_data = response.data;
                axios.get(`${process.env.REACT_APP_API}/noticias`)
                    .catch(function (error) {
                        console.log(error)
                    })
                    .then(function (response) {
                        setNoticias(response.data)
                        setNoticia(noticia_data);
                    })
            })
    }, [id])

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
                                {
                                    noticia.assets[0] ?
                                        <img src={noticia.assets[0].asset.url} alt={noticia.assets[0].asset.titulo} className="imagen-juego" /> : <></>
                                }
                                <p className={noticia.assets[0] ? "fecha" : ''}>{moment(noticia.fecha, "YYYY-MM-DD").format("MMMM, DD, YYYY")}</p>
                                <div className="rich-text" dangerouslySetInnerHTML={{ __html: noticia.descripcion }}></div>
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