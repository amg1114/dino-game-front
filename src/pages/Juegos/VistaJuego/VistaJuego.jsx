import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import './VistaJuego.css'
import { VistaCompra } from "../VistaCompra/VistaCompra";


export function VistaJuego() {

    const { id } = useParams()
    const ENDPOINT_API = `${process.env.REACT_APP_API}/video-games/${id}`
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
                                    <div> <img className="img1" src={juego.assets[0].asset.url} alt={juego.assets[0].asset.title} /></div>
                                    <div>
                                        {juego.assets.slice(1, juego.assets.length).map((img, index) => {
                                            return (<img className="mas-img" key={index} src={img.asset.url} alt={img.asset.title} />)
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

                                    <div>
                                        <h3 className="color-green">Descripcion</h3>
                                        <p>{juego.descripcion}</p>
                                    </div>
                                    <div>
                                        <h3 className="color-green">Desarrollador <span className="color-white" >{juego.developer.user.nombre}</span></h3>
                                        <div className="separador"></div>
                                    </div>

                                    <div className="info-video-game">
                                        <div className="info-requisitos">
                                            <h3 className="color-green">Requisitos:</h3>
                                            <ul>
                                                {juego.versions[0].requisitos.map((req) => {
                                                    return <li className="color-white" key={req.id}>{req.requisito}</li>
                                                })
                                                }
                                            </ul>
                                        </div>
                                        <div className="info-version">
                                            <h3 className="color-green">VERSIÓN RECIENTE</h3>
                                            <span className="color-white">{juego.versions[0].version}</span>
                                            <p className="color-white">{juego.versions[0].descripcion}</p>
                                        </div>
                                        <div className="info-tamaño">
                                            <h3 className="color-green">TAMAÑO: <span className="color-white"> {juego.versions[0].size}</span></h3>
                                        </div>
                                    </div>

                                    <div className="valor-comprar">
                                        <div className="comprar">
                                            {juego.descuentos[0] ? <>

                                                <span className="precio">${juego.precio}</span>
                                                <Link to={`/juegos/${id}/compra`}>
                                                    <buttom className="btn btn-1 comprar" >comprar ${(juego.precio) - (juego.precio) * (juego.descuentos[0].porcentaje)}</buttom>
                                                </Link>
                                            </> :
                                                <Link to={`/juegos/${id}/compra`}>
                                                    <buttom className="btn btn-1 comprar" >comprar ${juego.precio}</buttom>
                                                </Link>
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

