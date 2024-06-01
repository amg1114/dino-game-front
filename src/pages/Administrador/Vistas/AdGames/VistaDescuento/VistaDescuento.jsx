import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin"
import { TextField } from "@mui/material"
import './VistaDescuento.css'

export function VistaDescuento() {
    const navigate = useNavigate()
    const { id } = useParams()
    const ENDPOINT = process.env.REACT_APP_API + `/video-games/${id}/descuentos`
    const ENDPOINT_GAME = process.env.REACT_APP_API + `/video-games/${id}`
    const [juego, setJuego] = useState(null)
    useEffect(() => {
        axios.get(ENDPOINT_GAME)
            .then((respuesta) => {
                setJuego(respuesta.data)
                console.log(respuesta.data)
            })
            .catch((error) => {
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
                axios.post(ENDPOINT, datos)
                    .then(() => {
                        Swal.fire('Descuento generado con exito', 'exito', 'success')
                        navigate('/admin')
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
                                <Link to="/admin" className="modal-closer-admin">
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
                                            label="PORCENTAJE"
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