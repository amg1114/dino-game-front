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
    }, []
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
                                    <div> <img className="img1" src={juego.assets[0].url} alt={juego.assets[0].title} /></div>
                                    <div>
                                        {juego.assets.slice(1, juego.assets.length).map((img, index) => {
                                            return (<img className="mas-img" key={index} src={img.url} alt={img.title} />)
                                        })
                                        }
                                    </div>


                                </div>
                                <div className="info-derecha">
                                    <h2 className="titulo-juego">{juego.titulo}</h2>

                                    <div className="categoria">
                                        {juego.categorias.map((index) => {
                                            return (<h3 className="categoria-juego">{index.titulo}</h3>)
                                        })
                                        }
                                    </div>

                                    <p>

                                        <p> <span className="descripcion"> descripción <br /></span>  {juego.descripcion} </p>
                                        <span className="desarrollador">Desarrollado por:<span className="det-nom-edit" >{juego.developer.user.nombre}</span></span>
                                        <div className="separador"></div>

                                    </p>

                                    <p className="info"><div className="req">requisitos:  {juego.versions[0].requisitos.map((req, index) => {
                                        return (<span className="requisitos">{req.requisito} </span >)
                                    })}
                                    </div>

                                        <p className="ver">
                                            información de la versión reciente:
                                            <span className="version">{juego.assets[0].title}</span>
                                        </p>

                                    </p>
                                    <div className="det-dev-size">
                                        <p className="size">tamaño: <span className="requisitos">100GB</span></p>
                                    </div>

                                    <div className="valor-comprar">
                                        <div className="comprar">
                                            {juego.descuentos[0] ? <>

                                                <h2 className="precio">precio: col${juego.precio}</h2>
                                                <buttom className="btn btn-1 comprar" >comprar ${(juego.precio) - (juego.precio) * (juego.descuentos[0].porcentaje)}</buttom>
                                            </> :

                                                <buttom className="btn btn-1 comprar" >comprar ${juego.precio}</buttom>
                                            }
                                        </div>
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