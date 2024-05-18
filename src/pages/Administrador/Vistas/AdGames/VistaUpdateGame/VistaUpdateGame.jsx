import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './VistaUpdateGame.css'
import axios from "axios";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import { InputFilledStyle } from "../../../../../utils/mui.styles";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";

export function VistaUpdateGame() {
    const { id } = useParams()
    const ENDPOINT = process.env.REACT_APP_API + `/video-games/${id}`
    const navigate = useNavigate();
    const [juego, setJuego] = useState(null)
    const [validacion, setValidacion] = useState(false)
    const [descuento, setDescuento] = useState(0)

    useEffect(() => {
        axios.get(ENDPOINT)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setJuego(respuesta.data);
            })
    }, [])

    const handleBorrar = (event) => {
        // ESTO AUN NO SE HA ENVIADO EN LA PROPIEDAD ONCLICK DEL BOTON DE ELIMINAR 
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar el juego?',
            text: 'No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'CONFIRMAR',
            cancelButtonText: 'CANCELAR'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/admin')
                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelado', 'El juego no fue eliminado', 'error');
            }
        })
    }

    const handleDescuento = (event) => {
        event.preventDefault();
        setValidacion(true)
    }

    const handleAceptar = (event) => {
        event.preventDefault();
        const params = {
            titulo: juego.titulo,
            precio: juego.precio - ((descuento / 100) * juego.precio),
            descripcion: juego.descripcion,
            fechaLanzamiento: juego.fechaLanzamiento
        }
        console.log(juego.precio)
        console.log(params)

        // FALTA REALIZAR LA PETICION PATCH
    }

    return <>
        {juego === null ? <></> : (
            <div>
                <div className="modal-fade animate__animated animate__fadeIn">
                    <div className="modal-content-admin animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <Link to="/admin" className="modal-closer">
                                <span className="material-symbols-outlined close-admin">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="vista-juego">
                            <div className="info-izquierda">
                                <div> <img className="img1" src={juego.assets[0].url} alt={juego.assets[0].titulo} /></div>
                                <div>
                                    {juego.assets.slice(1, juego.assets.length).map((img, index) => {
                                        return (<img className="mas-img" key={index} src={img.url} alt={img.title} />)
                                    })
                                    }
                                </div>
                                <div className="det-dev-size">
                                    <div>
                                        <p>desarrollador <br /><span className="det-nom-admin-edit">Nombre: <br /></span> <span className="det-nom-admin-edit">Editor:</span></p>
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
                                        return (<h3 className="categoria-juego">{index.titulo}</h3>)
                                    })
                                    }
                                </div>

                                <p>
                                    <span className="version">información de la versión reciente</span> <br />
                                </p>

                                <p><span className="req">requisitos</span><br /> </p>
                                <div className="valor-comprar-admin">
                                    <h2 className="precio">precio: col${juego.precio}</h2>
                                    <div className="opciones-admin">
                                        <div className="botones-admin">
                                            <button className="btn btn-2" onClick={handleDescuento}>
                                                GENERAR DESCUENTO
                                            </button>
                                            <button className="btn btn-3" onClick={handleBorrar}>
                                                ELIMINAR JUEGO
                                            </button>
                                        </div>
                                        {validacion ? (
                                            <>
                                                <TextField label="Descuento"
                                                    variant="filled"
                                                    type="number"
                                                    sx={InputFilledStyleAdmin}
                                                    value={descuento}
                                                    onChange={(event) => setDescuento(event.target.value)}
                                                />
                                                <button className="btn btn-admin" onClick={handleAceptar}>ACEPTAR</button>
                                            </>
                                        ) : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
}