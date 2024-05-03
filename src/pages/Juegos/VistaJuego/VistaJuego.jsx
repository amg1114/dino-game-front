import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import './VistaJuego.css'

export function VistaJuego() {

    const { id } = useParams()
    const ENDPOINT_API = `https://dinogame.up.railway.app/api/video-games/${id}`
    const [juego, setJuego] = useState(null);

    useEffect(() => {

        axios.get(ENDPOINT_API)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setJuego(respuesta.data);
            })
    }
    )

    return <>

        {
            juego === null ? <></> : (
                <div>
                    <div className="modal-fade animate__animated animate__fadeIn">
                        <div className="modal-content animate__animated animate__slideInDown">
                            <div className="modal-header">
                                <Link to="/juegos" className="modal-closer">
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </Link>
                            </div>
                            <div className="vista-juego">
                                <div className="info-izquierda">
                                    <div> <img className="img1" src={juego.assets[0].url} alt={juego.assets[0].titulo} /></div>
                                    <div>
                                        {juego.assets.slice(1, 3).map((img) => {
                                            return (<img className="mas-img" src={img.url} alt={img.title} />)
                                        })
                                        }
                                    </div>
                                    <div className="det-dev-size">
                                        <div>
                                            <p>desarrollador <br /><span className="det-nom-edit">Nombre: <br /></span> <span className="det-nom-edit">Editor:</span></p>
                                        </div>
                                        <p className="size">tamaño</p>
                                    </div>
                                    <p className="comentarios">comentarios</p>

                                </div>
                                <div className="info-derecha">
                                    <h2 className="titulo-juego">{juego.titulo}</h2>
                                    <p> <span className="descripcion"> descripción <br /></span>  {juego.descripcion} </p>
                                    
                                    <p className="cat">categoria</p>

                                    <div className="categoria">
                                        {juego.categorias.map((index) => {
                                            return ( <h3 className="categoria-juego">{index.titulo}</h3> )
                                        })
                                        }
                                    </div>

                                    <p>
                                        <span className="version">información de la versión reciente</span> <br />
                                    </p>

                                    <p><span className="req">requisitos</span><br /> </p>
                                    <div className="valor-comprar">
                                        <h2 className="precio">precio: col${juego.precio}</h2>
                                        <button className="btn-comprar" type="button">comprar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
}