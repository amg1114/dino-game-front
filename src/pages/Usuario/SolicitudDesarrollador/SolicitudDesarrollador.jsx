import { TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import "./SolicitudDesarrollador.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function SolicitudDesarrollador() {
    const { usuario } = useAuth()
    const navigate = useNavigate()
    const [validacion, setValidacion] = useState(false)
    const [solicitud, setSolicitud] = useState({
        nombre: '',
        mensaje: ''
    })

    useEffect(() => {
        if (usuario) {
            axios.get(process.env.REACT_APP_API + `/users/${usuario.id}/solicitud-desarrollador`)
                .then((respuesta) => {
                    setValidacion(true)
                    Swal.fire({
                        icon: "info",
                        title: "Solicitud en proceso",
                        text: "Ya has realizado una solicitud de desarrollador"
                    }).then(() => {
                        navigate("/perfil")
                    })
                    console.log(respuesta.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [usuario])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSolicitud(prevSolicitud => ({ ...prevSolicitud, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post((process.env.REACT_APP_API + `/users/${usuario.id}/solicitud-desarrollador`), solicitud)
            .then((respuesta) => {
                console.log(respuesta.data)
                Swal.fire({
                    icon: "success",
                    title: "Solicitud enviada",
                    text: "La solicitud fue enviada con exito"
                }).then(() => {
                    navigate("/perfil")
                })
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Solicitud no enviada",
                    text: "La solicitud no pudo ser enviada"
                })
            })
        console.log('Datos enviados:', solicitud);
    }

    return <>
        {validacion ? <><h2>YA HAS REALIZADO UNA SOLICITUD</h2></> : (

            <div className="container">
                <div className="contenedor-solicitud">

                    <h2>SOLICITUD PERFIL DE DESARROLLADOR</h2>

                    <h2>¡HOLA <span>DINO</span>AMIGO! AL LLENAR ESTE FORMULARIO, SE ENVIARÁ UNA SOLICITUD PARA CREAR UN PERFIL DE DESARROLLADOR EL CUAL TE PERMITE PUBLICAR JUEGOS.</h2>

                    <form id="form-solicitud-desarrollador" className="form">
                        <div className="field-wrapper full-width">
                            <TextField
                                id="asunto"
                                name="nombre"
                                label="Asunto"
                                placeholder="ASUNTO"
                                value={solicitud.asunto}
                                onChange={handleChange}
                                sx={InputFilledStyle}
                                variant="filled"
                                fullWidth
                            />
                        </div>

                        <div className="field-wrapper full-width">
                            <TextField
                                id="mensaje"
                                name="mensaje"
                                label="Mensaje"
                                placeholder="MENSAJE"
                                multiline
                                minRows={9}
                                value={solicitud.mensaje}
                                onChange={handleChange}
                                sx={InputFilledStyle}
                                variant="filled"
                                fullWidth
                            />
                        </div>
                        <div className="buttons-group">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className='btn btn-4'
                            >
                                ENVIAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
        }
    </>
}