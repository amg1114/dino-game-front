import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { HomeListaNoticia } from "../../../../../partials/HomeListaNoticia/HomeListaNoticia";
import './VistaAdNews.css'

export function VistaAdNews() {
    const { id } = useParams()
    const ENDPOINT = process.env.REACT_APP_API + `/noticias`
    const [noticia, setNoticia] = useState(null)
    const [noticias, setNoticias] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(ENDPOINT + `/${id}`)
            .then((respuesta) => {
                const noticia = respuesta.data
                axios.get(ENDPOINT)
                    .then((respuesta) => {
                        const noticias = respuesta.data
                        setNoticias(noticias)
                        setNoticia(noticia)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    const handleDelete = (event) => {
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar esta noticia?',
            text: 'No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'CONFIRMAR',
            cancelButtonText: 'CANCELAR'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/admin/news')
                /*
                axios.delete(ENDPOINT + `/${id}`)
                    .then(() => {
                        Swal.fire('ELIMINADO', 'La noticia fue eliminada', 'success');
                    })
                    .catch(() => {
                        Swal.fire('ERROR', 'OCURRIO UN ERROR AL ELIMINAR ESTA NOTICIA', 'error');
                    })
                */    
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('CANCELADO', 'El juego no fue eliminado', 'error');
            }
        })

    }
    return <>
        {
            noticia === null ? <></> : (
                <div className="modal-fade animate__animated animate__fadeIn">
                    <div className="modal-content-admin animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <Link to="/admin/news" className="modal-closer">
                                <span className="material-symbols-outlined close-admin">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="container content-modal">
                            <div className="izquierda">
                                <h2>{noticia.titulo}</h2>
                                <img src={noticia.assets[0].url} alt={noticia.assets[0].titulo} className="imagen-juego" />
                                <p className="fecha">{moment(noticia.fecha, "YYYY-MM-DD").format("MMMM, DD, YYYY")}</p>
                                <p>{noticia.descripcion}</p>
                            </div>
                            <div className="derecha">
                                <HomeListaNoticia notices={noticias} />
                            </div>
                        </div>

                        <button className="btn btn-3 centrar" onClick={handleDelete}>
                            ELIMINAR NOTICIA
                        </button>

                    </div>
                </div>)
        }
    </>
}