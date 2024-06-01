import './VistaDescuento.css'

import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { TextField } from "@mui/material"

import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin"

export function VistaDescuento() {
    const { handleUpdate } = useOutletContext();
    const navigate = useNavigate()
    const { id } = useParams()
    const ENDPOINT = process.env.REACT_APP_API + `/video-games/${id}/descuentos`
    const ENDPOINT_GAME = process.env.REACT_APP_API + `/video-games/${id}`
    const [juego, setJuego] = useState(null)
    useEffect(() => {
        axios.get(ENDPOINT_GAME)
            .then((respuesta) => {
                setJuego(respuesta.data)
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error al cargar el juego',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                console.log(error)
            })
    }, [])

    const handleDescuento = () => {
        Swal.fire({
            title: '¿Estás seguro de generar este descuento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(ENDPOINT, {
                    porcentaje: datos.porcentaje / 100,
                    fechaInicio: datos.fechaInicio,
                    fechaFin: datos.fechaFin
                })
                    .then(() => {
                        Swal.fire('Descuento generado con exito', 'exito', 'success')
                        navigate(`/admin/${id}/descuentos`)
                        handleUpdate()
                    })
            }
        })
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }));
    };
    const [datos, setDatos] = useState({
        porcentaje: 0,
        fechaInicio: "",
        fechaFin: ""
    })
    return <>

        {
            juego === null ? <></> : (
                <div>
                    <div className="modal-fade animate__animated animate__fadeIn">
                        <div className="modal-content-admin animate__animated animate__slideInDown">
                            <div className="modal-header">
                                <Link to={`/admin/${id}/descuentos`} className="modal-closer-admin">
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </Link>
                            </div>
                            <div className="modal-descuento">
                                <h2>Generar Descuento para {juego.titulo}</h2>
                                <form className="form">
                                    <div className="field-wrapper full-width">
                                        <TextField
                                            id="porcentaje"
                                            label="PORCENTAJE DE DESCUENTO"
                                            name="porcentaje"
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            sx={InputFilledStyleAdmin}
                                            value={datos.porcentaje}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="field-wrapper full-width">
                                        <TextField
                                            id="fechaInicio"
                                            label='FECHA DE INICIO'
                                            name="fechaInicio"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleChange}
                                            value={datos.fechaInicio}
                                            sx={InputFilledStyleAdmin}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="field-wrapper full-width">
                                        <TextField
                                            id="fechaFin"
                                            label='FECHA DE FINALIZACION'
                                            name="fechaFin"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleChange}
                                            value={datos.fechaFin}
                                            sx={InputFilledStyleAdmin}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="boton-descuento">
                                        <Link className="btn btn-4" onClick={handleDescuento}>
                                            GENERAR
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
}