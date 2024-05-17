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
                                    <div className="det-dev-size">
                                        <div>
                                            <p>desarrollador <br /><span className="det-nom-edit">Nombre: {juego.developer.user.nombre}  <br /></span> <span className="det-nom-edit">Editor: {juego.developer.user.nombre} </span></p>
                                        </div>
                                        <p className="size">tamaño: <span className = "requisitos">100GB</span></p>
                                    </div>
                                    <p className="comentarios">comentarios</p>

                                </div>
                                <div className="info-derecha">
                                    <h2 className="titulo-juego">{juego.titulo}</h2>
                                    <p> <span className="descripcion"> descripción <br /></span>  {juego.descripcion} </p>

                                    <p className="cat">categoria</p>

                                    <div className="categoria">
                                        {juego.categorias.map((index) => {
                                            return (<h3 className="categoria-juego">{index.titulo}</h3>)
                                        })
                                        }
                                    </div>

                                    <p>
                                        <span className="info">información de la versión reciente

                                            <span className="version">{juego.assets[0].title}</span> </span> <br />
                                    </p>

                                    <p><span className="req">requisitos:  {juego.versions[0].requisitos.map((req, index) => {
                                        return (<span className = "requisitos">{req.requisito} </span >)
                                    })}</span><br /> </p>
                                    
                                    <div className="valor-comprar">
                                        <div className="comprar">
                                            <h2 className="precio">precio: col${juego.precio}</h2>
                                            <h2 className="descuento">descuento: ${juego.descuento}</h2>
                                            <h2 calssName="descuento">% descuento: ${juego.descuento}</h2>
                                        </div>
                                            <span><button className="btn-comprar" type="button">comprar</button></span>
                                        
                                       
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