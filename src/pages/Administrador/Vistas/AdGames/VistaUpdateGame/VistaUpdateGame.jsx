import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './VistaUpdateGame.css'
import axios from "axios";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import { InputFilledStyle } from "../../../../../utils/mui.styles";

export function VistaUpdateGame() {
    const { id } = useParams()
    const ENDPOINT = process.env.REACT_APP_API + `/video-games/${id}`
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
                axios.delete(ENDPOINT)
                    .then(() => {
                        Swal.fire('Eliminado!', 'El juego fue eliminado con exito', 'success');
                    })
                    .catch((error) => {
                        console.log(error)
                    })
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
            precio: juego.precio - ((descuento/100)*juego.precio),
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
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="modalGameAdmin">
                            <h2>{juego.titulo}</h2>
                            <div className="opciones-admin">
                                <button className="btn btn-3">
                                    ELIMINAR JUEGO
                                </button>
                                <button className="btn btn-4" onClick={handleDescuento}>
                                    GENERAR DESCUENTO
                                </button>
                            </div>
                            {validacion ? (
                                <>
                                    <TextField label="Descuento"
                                        variant="filled"
                                        type="number"
                                        sx={InputFilledStyle}
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
        )}
    </>
}